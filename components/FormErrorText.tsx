import FormHelperText from "@mui/material/FormHelperText/FormHelperText";

export const FormErrorText = ({ errorText }: { errorText: string }) => {
  return <p className="text-red-500 text-center text-base">{errorText}</p>;
};
