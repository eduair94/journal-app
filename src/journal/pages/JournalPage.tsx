import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNoteById, startNewNote } from "../../store/journal";
import { AppDispatch, RootState } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoadingNotes } from "../../../ui";

export const JournalPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { noteId } = useParams();
  const { isSaving, active, notes, loadingNotes } = useSelector(
    (state: RootState) => state.journal,
  );

  useEffect(() => {
    if (notes.length) {
      dispatch(setActiveNoteById({ id: noteId }));
    }
  }, [dispatch, noteId, notes]);

  const onNewNote = () => {
    dispatch(startNewNote());
  };

  if (loadingNotes) {
    return (
      <JournalLayout>
        <LoadingNotes />
      </JournalLayout>
    );
  }

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          ":disabled": { backgroundColor: "error.main", opacity: 0.2 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
