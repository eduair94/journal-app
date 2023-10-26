import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { FormValues, useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo, useRef } from "react";
import {
  JournalNoteI,
  resetMessageSaved,
  setActiveNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { startDeletingNote } from "../../store/auth";

export const NoteView = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state: RootState) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(
    note as unknown as FormValues,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setActiveNote(formState as unknown as JournalNoteI));
  }, [formState, dispatch]);

  useEffect(() => {
    if (messageSaved.length) {
      Swal.fire("Nota actualizada", messageSaved, "success");
      dispatch(resetMessageSaved());
    }
  }, [dispatch, messageSaved]);

  const dateString = useMemo(() => {
    const newDate = new Date(date as unknown as number);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length === 0) return;
    dispatch(startUploadingFiles(target.files as FileList));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography
          sx={{
            fontSize: {
              xs: 24,
              sm: 24,
              md: 39,
              lg: 39,
            },
          }}
          fontWeight="light"
        >
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadOutlined color="primary" />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Títutlo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          onChange={onInputChange}
          value={title}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
          name="body"
          onChange={onInputChange}
          value={body}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button
          color="error"
          onClick={onDelete}
          sx={{ mt: 2 }}
          disabled={isSaving}
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      <ImageGallery images={(note as JournalNoteI).imageUrls} />
    </Grid>
  );
};
