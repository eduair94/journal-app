import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { FormValidationsI, useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  AuthStatusEnum,
  UserRI,
  startCreatingUserWithEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations: FormValidationsI = {
  email: [(value: string) => value.includes("@"), "El correo debe tener un @"],
  password: [
    (value: string) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
  ],
  displayName: [
    (value: string) => value.length > 0,
    "El nombre es obligatorio",
  ],
};

export const RegisterPage = () => {
  const {
    displayName,
    email,
    password,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
    setFormSubmitted,
  } = useForm(formData, formValidations);

  const { errorMessage, status } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch: AppDispatch = useDispatch();

  const isAuthenticating = useMemo(
    () => status === AuthStatusEnum.checking,
    [status],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(
      startCreatingUserWithEmailPassword({
        email,
        password,
        displayName,
      } as UserRI),
    );
  };

  return (
    <AuthLayout title="Sign up">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
        action=""
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              value={displayName}
              name="displayName"
              onChange={onInputChange}
              error={!!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              value={email}
              name="email"
              onChange={onInputChange}
              error={!!emailValid}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={passwordValid}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sx={{ display: !errorMessage ? "none" : "" }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
          <Link color="inherit" to="/auth/login">
            Ingresar
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
