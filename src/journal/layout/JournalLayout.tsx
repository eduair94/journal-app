import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
export const JournalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <NavBar />
      {/* Sidebar */}
      <SideBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
