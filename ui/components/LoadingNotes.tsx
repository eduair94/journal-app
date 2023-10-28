import { CircularProgress, Grid } from "@mui/material";

export const LoadingNotes = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
        backgroundColor: "primary.main",
        padding: 4,
        maxHeight: "80vh",
      }}
    >
      <Grid
        item
        sx={{
          width: {
            sm: "auto",
          },
        }}
      >
        <CircularProgress size={100} color="warning" />
      </Grid>
    </Grid>
  );
};
