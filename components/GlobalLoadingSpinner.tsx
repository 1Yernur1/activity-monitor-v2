import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export const GlobalLoadingSpinner = () => {
  return (
    <div className=" h-96 grid place-items-center">
      <CircularProgress />
    </div>
  );
};
