import TurnedInNot from "@mui/icons-material/TurnedInNot";
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
import { useMobile } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const SideBarItem = (note: JournalNoteI) => {
  const { title, body } = note;
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const isMobile = useMobile();

  const onClickNote = () => {
    console.log("Navigate", note.id);
    navigate("/" + note.id);
    //dispatch(setActiveNote(note));
    if (isMobile) dispatch(toggleSideBar());
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
