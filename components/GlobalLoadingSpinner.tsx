import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export const GlobalLoadingSpinner = () => {
  return (
    <div className=" h-screen grid place-items-center">
      <CircularProgress />
    </div>
  );
};
