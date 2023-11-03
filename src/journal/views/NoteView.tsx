import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { FormValidationsI, FormValues, useForm } from "../../hooks";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../store";
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
import { useNavigate } from "react-router-dom";
import { ImageUploadProgress } from "../components/ImageUploadProgress";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const formValidations: FormValidationsI = {
  title: [(value: string) => !!value, "El título no puede estar vacío"],
  body: [(value: string) => !!value, "La descripción no puede estar vacía"],
};

export const NoteView = () => {
  console.log("Note");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state: RootState) => state.journal);

  const {
    body,
    title,
    date,
    onInputChange,
    formState,
    bodyValid,
    titleValid,
    isFormValid,
  } = useForm(note as unknown as FormValues, formValidations);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setActiveNote(formState as unknown as JournalNoteI));
  }, [formState, dispatch]);

  useEffect(() => {
    if (messageSaved.length) {
      MySwal.close();
      setTimeout(() => {
        MySwal.fire("Nota actualizada", messageSaved, "success");
      });
      dispatch(resetMessageSaved());
    }
  }, [dispatch, messageSaved]);

  const dateString = useMemo(() => {
    const newDate = new Date(date as unknown as number);
    return newDate.toUTCString();
  }, [date]);

  const progressImageUpload = () => {
    MySwal.fire({
      title: "Saving note",
      html: (
        <Provider store={store}>
          <ImageUploadProgress />
        </Provider>
      ),
      didOpen: () => {
        MySwal.showLoading();
      },
      didClose: () => {
        console.log("Closed");
      },
      allowOutsideClick: () => {
        const popup = MySwal.getPopup();
        popup.classList.remove("swal2-show");
        setTimeout(() => {
          popup.classList.add("animate__animated", "animate__headShake");
        });
        setTimeout(() => {
          popup.classList.remove("animate__animated", "animate__headShake");
        }, 500);
        return false;
      },
    });
  };

  const onSaveNote = () => {
    if (!isFormValid) return;
    progressImageUpload();
    dispatch(startSavingNote()).then(({ isNew, id }) => {
      if (isNew) navigate("/" + id);
    });
  };

  const onFileInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length === 0) return;
    dispatch(startUploadingFiles(target.files as FileList));
  };

  const onDelete = () => {
    dispatch(startDeletingNote()).then(() => {
      navigate("/");
    });
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
          error={!!titleValid}
          helperText={titleValid}
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
          error={!!bodyValid}
          helperText={bodyValid}
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
