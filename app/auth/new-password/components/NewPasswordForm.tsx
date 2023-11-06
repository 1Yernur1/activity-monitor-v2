import { FormErrorText } from "@/components/FormErrorText";
import { FormTitle } from "@/components/FormTitle";
import { PasswordInputField } from "@/components/PasswordInputField";
import { ResetButton } from "@/components/ResetButton";
import { SubmitButton } from "@/components/SubmitButton";
import { auth } from "@/config/firebaseConfig";
import { Grow } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import { confirmPasswordReset } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setShowForm(true), 100);
    return () => clearTimeout(delay);
  }, []);

  const handleChangeNewPasswordField = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setNewPassword(event.target.value);

  const handleChangeConfirmPasswordField = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setConfirmPassword(event.target.value);

  const handleSubmitCreatingNewPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitButtonDisabled(true);
    const oobCode = searchParams.get("oobCode");
    const isSamePasswordFields = newPassword === confirmPassword;
    if (isSamePasswordFields && oobCode) {
      confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => router.push("/"))
        .catch(() => setIsErrorPassword(true));
    } else {
      setIsErrorPassword(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Grow in={showForm} timeout={1000}>
        <Paper elevation={3} className="p-4 flex flex-col items-center">
          <FormTitle title="Change password" />
          <Box component="form" onSubmit={handleSubmitCreatingNewPassword}>
            {isErrorPassword && (
              <FormErrorText errorText="Please make sure the passwords you entered are identical" />
            )}
            <PasswordInputField
              label="New Password"
              onChangePasswordField={handleChangeNewPasswordField}
              isErrorPasswordField={isErrorPassword}
            />
            <PasswordInputField
              label="Confirm New Password"
              onChangePasswordField={handleChangeConfirmPasswordField}
              isErrorPasswordField={isErrorPassword}
            />
            <SubmitButton
              buttonText="Submit"
              isSubmitButtonDisabled={isSubmitButtonDisabled}
            />
            <ResetButton />
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};
