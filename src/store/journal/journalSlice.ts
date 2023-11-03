import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FileImageI, JournalNoteI } from './journal.interface';

const initialState = {
    isSaving: false,
    messagesSaved: '',
    notes: [] as JournalNoteI[],
    active: null as JournalNoteI | null,
    messageSaved: [],
    loadingNotes: true,
    imageUploadCounter: [0, 0]
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setImageUploadCounter: (state, action: PayloadAction<number[]>) => {
      state.imageUploadCounter = action.payload;
    },
    addNewEmptyNote: (state, action: PayloadAction<JournalNoteI>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<JournalNoteI>) => {
      state.active = action.payload;
    },
    setActiveNoteById: (state, action: PayloadAction<{id: string}>) => {
      state.active = state.notes.find(el => el.id === action.payload.id);
    },
    setNotes: (state, action:  PayloadAction<JournalNoteI[]>) => {
      state.notes = action.payload;
      state.loadingNotes = false;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.active = null;
      state.isSaving = false;
      state.notes = state.notes.filter(el=> {
        return el.id !== action.payload;
      })
    },
    updateNote: (state, action:PayloadAction<JournalNoteI>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if(note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      })
      state.active.imageUrls = action.payload.imageUrls;
      state.messageSaved = ['Note updated', `${action.payload.title} saved`];
    },
    newNote: (state, action: PayloadAction<JournalNoteI>) => {
      state.isSaving = false;
      state.notes.unshift(action.payload)
      state.active.imageUrls = action.payload.imageUrls;
      state.messageSaved = ['New Note', `${action.payload.title} created`];
    },
    resetMessageSaved: (state) => {
      state.messageSaved = [];
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[] | FileImageI[]>) => {
      if(!state.active) return;
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = [];
      state.notes = [];
      state.active = null;
    },
    setLoadingNotes: (state, action: PayloadAction<boolean>) => {
      state.loadingNotes = action.payload;
    },
    deleteImageFromActiveNote(state, action: PayloadAction<string|FileImageI>) {
      if(!state.active) return;
      state.active.imageUrls = state.active.imageUrls.filter(el => {
        if(typeof el === 'string') {
          return el !== action.payload;
        } else {
          return el.url !== action.payload;
        }
      });
    }
  }
});

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
    newNote,
    resetMessageSaved,
    clearNotesLogout,
    deleteNoteById,
    setActiveNoteById,
    setLoadingNotes,
    setImageUploadCounter,
    deleteImageFromActiveNote
} = journalSlice.actions

export default journalSlice.reducer