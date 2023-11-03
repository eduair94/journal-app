import { collection, doc, setDoc} from 'firebase/firestore/lite';
import { AppDispatch, RootState } from ".."
import { FileImageI, JournalNoteI, JournalNoteNewI, newNote, setActiveNote, setImageUploadCounter, setLoadingNotes, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./"
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async(dispatch:AppDispatch) => {
        const newNote:JournalNoteNewI = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }
        dispatch(setActiveNote(newNote as JournalNoteI));
        return newNote;
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
        if(note.imageUrls.some(el => typeof el === 'object')) {
            let count = 0;
            const toUpload = note.imageUrls.filter(el => typeof el === 'object');
            dispatch(setImageUploadCounter([count, toUpload.length]))
            const res = await Promise.all(toUpload.map(async ({url, name, type}: FileImageI) => {
                const file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type }));
                const fileUrl = await fileUpload(file as File);
                count++; dispatch(setImageUploadCounter([count, toUpload.length]))
                return fileUrl;
            }))
            const resFiles = res.filter(r => r !== null) as string[];
            imageUrls = [...note.imageUrls.filter(el => typeof el === 'string'), ...resFiles];
        }
        console.log("IMAGE URLS", imageUrls);
        const noteToFirestore: JournalNoteNewI = {...note, imageUrls};
        delete noteToFirestore.id;
        let res = { isNew: false, id: note.id}
        if(note.id) {
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);	
            await setDoc(docRef, noteToFirestore, {merge: true});
            dispatch(updateNote({...note, imageUrls}))
        } else {
            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            await setDoc(newDoc, noteToFirestore);
            dispatch(newNote({...note, imageUrls, id: newDoc.id}))
            res = { isNew: true, id: newDoc.id };
        }
        dispatch(setImageUploadCounter([0, 0]))
        return res;
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