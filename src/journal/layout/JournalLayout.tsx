import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
const drawerWidth = 240;
export const JournalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      {/* Sidebar */}
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
