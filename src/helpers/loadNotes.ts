import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { doc } from "firebase/firestore";
import { JournalNoteI } from "../store/journal";

export const loadNotes = async (uid = '') => {
    if(!uid) throw new Error("uid is required");
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const notes:JournalNoteI[] = [];
    docs.forEach((doc) => {
        notes.push({id: doc.id, ...doc.data()} as JournalNoteI);
    })
    return notes;
}