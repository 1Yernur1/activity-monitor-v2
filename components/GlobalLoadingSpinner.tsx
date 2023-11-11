import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export const GlobalLoadingSpinner = () => {
  return (
    <div className=" h-96 w-full grid place-items-center col-span-full">
      <CircularProgress />
    </div>
  );
};
