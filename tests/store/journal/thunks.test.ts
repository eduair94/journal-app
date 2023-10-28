import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { JournalNoteI, addNewEmptyNote, setActiveNote, setSaving, startNewNote } from "../../../src/store/journal";

describe('Test in JournalThunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote should create a new blank note', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: {uid}});
        await startNewNote()(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(setSaving())
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            imageUrls: [],
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
        } as JournalNoteI))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            imageUrls: [],
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
        } as JournalNoteI))

        // Borrar de Firebase.
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
        const docs = await getDocs(collectionRef);
        const deletePromises:Promise<void>[] = [];
        docs.forEach(doc=> deletePromises.push(deleteDoc(doc.ref)))
        await Promise.all(deletePromises);
    }, 60000)  
    
 })