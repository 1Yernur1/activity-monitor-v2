import { Button } from "@mui/material";

export const SubmitButton = ({
  buttonText,
  isSubmitButtonDisabled,
}: {
  buttonText: string;
  isSubmitButtonDisabled: boolean;
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      className="bg-black mt-2"
      fullWidth
      disabled={isSubmitButtonDisabled}
    >
      {buttonText}
    </Button>
  );
};
