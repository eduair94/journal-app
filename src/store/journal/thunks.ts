import {collection, doc, setDoc} from 'firebase/firestore/lite';
import { AppDispatch, RootState } from ".."
import { FileImageI, JournalNoteI, JournalNoteNewI, addNewEmptyNote, setActiveNote, setLoadingNotes, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./"
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async(dispatch:AppDispatch, getState: () => RootState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;

        const newNote:JournalNoteNewI = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote as JournalNoteI));
        dispatch(setActiveNote(newNote as JournalNoteI));
    }
}


export const startLoadingNotes = () => {
    return async(dispatch:AppDispatch, getState: () => RootState) => {
        dispatch(setLoadingNotes(true));
        const {uid} = getState().auth;
        if(!uid) throw new Error("User Id doesn't exists");
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    };
}

export const startSavingNote = () => {
    return async(dispatch:AppDispatch, getState: () => RootState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        console.log("Start saving note", note);
        if(!note) return;

        // Upload Image Files.
        let imageUrls = note.imageUrls;
        console.log("Upload image files");
        if(note.imageUrls.some(el => typeof el === 'object')) {
            const res = await Promise.all(note.imageUrls.filter(el => typeof el === 'object').map(async ({url, name, type}: FileImageI) => {
                const file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type }));
                return fileUpload(file as File);
            }))
            const resFiles = res.filter(r => r !== null) as string[];
            imageUrls = [...note.imageUrls.filter(el => typeof el === 'string'), ...resFiles];
        }
        console.log("End upload", imageUrls);

        const noteToFirestore: JournalNoteNewI = {...note, imageUrls};
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);	
        await setDoc(docRef, noteToFirestore, {merge: true});
        dispatch(updateNote({...note, imageUrls}))
    };
}

export const startUploadingFiles = (files: FileList) => {
    return async(dispatch:AppDispatch) => {
        dispatch(setSaving());
        const resFiles = Array.from(files).map(file=> ({
            url: URL.createObjectURL(file),
            type: file.type,
            name: file.name,
        }));
        dispatch(setPhotosToActiveNote(resFiles));
    }
}