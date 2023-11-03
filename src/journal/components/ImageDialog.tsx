import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ImageDialog = ({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!image);
  }, [image]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <>
      <BootstrapDialog
        maxWidth="xl"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Image Preview
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{ display: "flex", justifyContent: "center" }}
          dividers
        >
          <img
            src={image}
            alt="image"
            style={{
              maxWidth: "60vw",
              width: "auto",
              height: "80vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
