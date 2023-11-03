import { useState } from "react";
import { FileImageI } from "../../store/journal";
import { ImageDialog } from "./ImageDialog";
import { ImageGalleryList } from "./ImageGalleryList";

export const ImageGallery = ({
  images,
}: {
  images: (string | FileImageI)[];
}) => {
  const [imagePopup, setImagePopup] = useState("");
  return (
    <>
      <ImageGalleryList
        images={images}
        onImageClick={(image: string) => setImagePopup(image)}
      />
      <ImageDialog image={imagePopup} onClose={() => setImagePopup("")} />
    </>
  );
};
