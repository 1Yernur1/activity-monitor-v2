import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

export const EmailInputField = ({
  isErrorEmailsField = false,
  onChangeEmailField,
}: {
  isErrorEmailsField?: boolean;
  onChangeEmailField: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <TextField
      name="email"
      type="email"
      label="Email Address"
      margin="normal"
      fullWidth
      required
      error={isErrorEmailsField}
      onChange={onChangeEmailField}
    />
  );
};
