import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import { JournalNoteI, setActiveNote } from "../../store/journal";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { toggleSideBar } from "../../store/sidebar";

export const SideBarItem = (note: JournalNoteI) => {
  const { title, body } = note;

  const dispatch: AppDispatch = useDispatch();

  const onClickNote = () => {
    dispatch(setActiveNote(note));
    dispatch(toggleSideBar());
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding onClick={onClickNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={newTitle}></ListItemText>
          <ListItemText secondary={body}></ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
