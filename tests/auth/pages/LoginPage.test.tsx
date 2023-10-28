import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn: () => void) => fn(),
}));

describe("Test in <LoginPage/>", () => {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: notAuthenticatedState,
    },
  });

  beforeEach(() => jest.clearAllMocks());
  test("it should show the component properly ", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("google button should call startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
    const button = screen.getByLabelText("google-sign-in");
    fireEvent.click(button);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("on form submit should call startLoginWithEmailPassword", () => {
    const email = "eduardo@mail.com",
      password = "123456";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
