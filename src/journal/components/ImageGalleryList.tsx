import { ImageListItem, Button, ImageList, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { FileImageI, deleteImageFromActiveNote } from "../../store/journal";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo } from "react";
import { purpleTheme } from "../../theme";

export const ImageGalleryList = memo(
  ({
    images: itemData,
    onImageClick,
  }: {
    images: (string | FileImageI)[];
    onImageClick: (image: string) => void;
  }) => {
    const dispatch = useDispatch();

    const removeImage = (
      item: string | FileImageI,
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      event.stopPropagation();
      dispatch(deleteImageFromActiveNote(item));
    };

    const onError = ({
      currentTarget,
    }: React.SyntheticEvent<HTMLImageElement, Event>) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = "images/not_found.webp";
    };

    const matchDownMd = useMediaQuery(purpleTheme.breakpoints.down("sm"));

    return (
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={matchDownMd ? 2 : 4}
        rowHeight={"auto"}
      >
        {itemData.map((item) => {
          if (typeof item !== "string") {
            item = item.url;
          }
          return (
            <ImageListItem
              key={item}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                onImageClick(item as string);
              }}
            >
              <img
                onError={(event) => onError(event)}
                src={item}
                alt="Imagen de la nota"
                loading="lazy"
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
                onClick={(event) => removeImage(item, event)}
              >
                <DeleteIcon />
              </Button>
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  },
);
