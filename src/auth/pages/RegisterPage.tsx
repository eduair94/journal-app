import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  AuthStatusEnum,
  UserRI,
  startCreatingUserWithEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";
import { FormValidationsI } from "../../helpers";

const formValidations: FormValidationsI = {
  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email is not valid",
    },
  },
  password: {
    required: { value: true, message: "Password is not valid" },
    minLength: { value: 6, message: "Password must be at least 6 characters" },
  },
  displayName: {
    required: { value: true, message: "Name is required" },
  },
};

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errorMessage, status } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch: AppDispatch = useDispatch();

  const isAuthenticating = useMemo(
    () => status === AuthStatusEnum.checking,
    [status],
  );

  const onSubmit = ({ email, password, displayName }) => {
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
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="Full Name"
              fullWidth
              {...register("displayName", formValidations.displayName)}
              error={!!errors.displayName}
              helperText={errors?.displayName?.message as string}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              {...register("email", formValidations.email)}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Contraseña"
              fullWidth
              {...register("password", formValidations.password)}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
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
              Create an account
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>
            Do you already have an account?
          </Typography>
          <Link color="inherit" to="/auth/login">
            Login
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
