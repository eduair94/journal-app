import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { SideBarItem } from ".";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { toggleSideBar } from "../../store/sidebar";
import { useMobile } from "../../hooks";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const SideBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);
  const isMobile = useMobile();

  const { open, drawerWidth } = useSelector(
    (state: RootState) => state.sidebar,
  );

  const handleDrawerClose = () => {
    dispatch(toggleSideBar());
  };

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      dispatch(toggleSideBar());
    };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        onClose={toggleDrawer()}
      >
        <DrawerHeader>
          <Typography variant="h6" fontSize="16px" component="div">
            {displayName}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {notes.map((note) => {
            return <SideBarItem key={note.id} {...note} />;
          })}
        </List>
      </Drawer>
    </Box>
  );
};
