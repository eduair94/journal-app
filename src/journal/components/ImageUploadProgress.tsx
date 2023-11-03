import { RootState } from "../../store";
import {
  LinearProgressProps,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; counter: number[] },
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 40 }}>
        <Typography variant="body2" color="text.secondary">
          {props.counter[0]}/{props.counter[1]}{" "}
        </Typography>
      </Box>
    </Box>
  );
}

export const ImageUploadProgress = () => {
  const { imageUploadCounter: counter } = useSelector(
    (state: RootState) => state.journal,
  );

  const progress = useMemo(() => {
    if (counter[0] === 0 || counter[1] === 0) return 0;
    return Math.round((counter[0] / counter[1]) * 100);
  }, [counter]);

  if (counter[0] === 0 && counter[1] === 0) {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography>No images to upload, saving title and text</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>Image upload progress</Typography>
      <LinearProgressWithLabel value={progress} counter={counter} />
    </Box>
  );
};
