import { CssBaseline, ThemeProvider } from "@mui/material";
import { purpleTheme } from "./";

export const AppTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
