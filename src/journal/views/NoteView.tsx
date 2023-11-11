import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "react-hook-form";
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
import { FormValidationsI } from "../../helpers";
import { format } from "date-fns";
const MySwal = withReactContent(Swal);

const formValidations: FormValidationsI = {
  title: {
    required: { value: true, message: "Title cannot be empty" },
  },
  body: {
    required: { value: true, message: "Description cannot be empty" },
  },
};

export const NoteView = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state: RootState) => state.journal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: note.title,
      body: note.body,
    },
  });

  useEffect(() => {
    setValue("title", note.title);
    setValue("body", note.body);
  }, [setValue, note.title, note.body]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const subscription = watch((value) => {
      const formState = { ...note, ...value };
      dispatch(setActiveNote(formState as JournalNoteI));
    });
    return () => subscription.unsubscribe();
  }, [note, dispatch, watch]);

  useEffect(() => {
    if (messageSaved.length) {
      MySwal.close();
      setTimeout(() => {
        MySwal.fire(messageSaved[0], messageSaved[1], "success");
      });
      dispatch(resetMessageSaved());
    }
  }, [dispatch, messageSaved]);

  const date = note.date;
  const dateString = useMemo(() => {
    console.log("Date", date);
    const newDate = new Date(date as unknown as number);
    return format(newDate, "yyyy/MM/dd HH:mm:ss");
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
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          onClick={handleSubmit(onSaveNote)}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          {...register("title", formValidations.title)}
          error={!!errors.title}
          helperText={errors?.title?.message as string}
          InputLabelProps={{ shrink: !!note.title }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
          {...register("body", formValidations.body)}
          error={!!errors.body}
          helperText={errors?.body?.message as string}
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
          Delete
        </Button>
      </Grid>
      <ImageGallery images={(note as JournalNoteI).imageUrls} />
    </Grid>
  );
};
