import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images: itemData }: { images: string[] }) => {
  return (
    <ImageList
      sx={{ width: "100%", height: "auto" }}
      cols={4}
      rowHeight={"auto"}
    >
      {itemData.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
