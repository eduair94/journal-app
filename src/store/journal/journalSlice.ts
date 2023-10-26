import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { JournalNoteI } from './journal.interface';

const initialState = {
    isSaving: false,
    messagesSaved: '',
    notes: [] as JournalNoteI[],
    active: null as JournalNoteI | null,
    messageSaved: ''
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<JournalNoteI>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<JournalNoteI>) => {
      state.active = action.payload;
    },
    setNotes: (state, action:  PayloadAction<JournalNoteI[]>) => {
      state.notes = action.payload;
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
      state.messageSaved = `${action.payload.title} saved`;
    },
    resetMessageSaved: (state) => {
      state.messageSaved = '';
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      if(!state.active) return;
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
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
    resetMessageSaved,
    clearNotesLogout,
    deleteNoteById
} = journalSlice.actions

export default journalSlice.reducer