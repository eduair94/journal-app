import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import { startLogout } from "../../store/auth";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../store/sidebar";

export const NavBar = () => {
  const dispatch: AppDispatch = useDispatch();

  const { drawerWidth } = useSelector((state: RootState) => state.sidebar);

  const onLogout = () => {
    dispatch(startLogout());
  };

  const handleDrawerClose = () => {
    dispatch(toggleSideBar());
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
          onClick={handleDrawerClose}
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
