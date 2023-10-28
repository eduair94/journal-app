import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { AppDispatch, RootState } from "../../store";

export const JournalPage = () => {
  const dispatch: AppDispatch = useDispatch();
  console.log("JOURNAL PAGE");

  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const onNewNote = () => {
    dispatch(startNewNote());
  };

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
