import { ImageList, ImageListItem } from "@mui/material";
import { FileImageI } from "../../store/journal";

export const ImageGallery = ({
  images: itemData,
}: {
  images: (string | FileImageI)[];
}) => {
  const onError = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = "images/not_found.webp";
  };

  return (
    <ImageList
      sx={{ width: "100%", height: "auto" }}
      cols={4}
      rowHeight={"auto"}
    >
      {itemData.map((item) => {
        if (typeof item !== "string") {
          item = item.url;
        }
        return (
          <ImageListItem key={item}>
            <img
              onError={(event) => onError(event)}
              src={item}
              alt="Imagen de la nota"
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
