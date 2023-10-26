import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import { startLogout } from "../../store/auth";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

export const NavBar = ({ drawerWidth }: { drawerWidth: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
          ml: { sm: `${drawerWidth}px` },
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction="row" justifyContent="space-between">
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
