import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AuthStatusEnum } from "../store/auth";
import { CheckingAuth } from "../../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === AuthStatusEnum.checking) {
    return <CheckingAuth />;
  }
  console.log("status", status);
  return (
    <Routes>
      {status === AuthStatusEnum.authenticated ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
