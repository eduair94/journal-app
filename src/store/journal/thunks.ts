import {collection, doc, setDoc} from 'firebase/firestore/lite';
import { AppDispatch, RootState } from ".."
import { JournalNoteI, JournalNoteNewI, addNewEmptyNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./"
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
        const noteToFirestore: JournalNoteNewI = {...note};
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);	
        await setDoc(docRef, noteToFirestore, {merge: true});
        dispatch(updateNote(note))
    };
}

export const startUploadingFiles = (files: FileList) => {
    return async(dispatch:AppDispatch) => {
        dispatch(setSaving());
        const res = await Promise.all(Array.from(files).map(file => {
            return fileUpload(file);
        }))
        const resFiles = res.filter(r => r !== null) as string[];
        dispatch(setPhotosToActiveNote(resFiles));
    }
}