import Google from "@mui/icons-material/Google";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import {
  AuthStatusEnum,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { AppDispatch, RootState } from "../../store";
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
};

export const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const isAuthenticating = useMemo(
    () => status === AuthStatusEnum.checking,
    [status],
  );

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("Submit");
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("on google sign in");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        noValidate
        data-testid="login-form"
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <Grid container>
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
              inputProps={{
                "data-testid": "password",
              }}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sx={{ display: !errorMessage ? "none" : "" }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              aria-label="google-sign-in"
              disabled={isAuthenticating}
              onClick={onGoogleSignIn}
              variant="contained"
              fullWidth
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Link color="inherit" to="/auth/register">
            Create an account
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
