import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
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
