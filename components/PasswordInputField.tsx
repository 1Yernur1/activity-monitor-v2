import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ShowPasswordIcon } from "./ShowPasswordIcon";

export const PasswordInputField = ({
  label = "Password",
  isErrorPasswordField,
  onChangePasswordField,
}: {
  label?: string;
  isErrorPasswordField: boolean;
  onChangePasswordField: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleSetPasswordVisibility = () =>
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);

  return (
    <FormControl margin="normal" fullWidth required>
      <InputLabel error={isErrorPasswordField}>{label}</InputLabel>
      <OutlinedInput
        autoComplete=""
        label={label}
        type={isPasswordVisible ? "text" : "password"}
        error={isErrorPasswordField}
        onChange={onChangePasswordField}
        endAdornment={
          <ShowPasswordIcon
            isPasswordVisible={isPasswordVisible}
            setPasswordVisibility={handleSetPasswordVisibility}
          />
        }
      />
    </FormControl>
  );
};
