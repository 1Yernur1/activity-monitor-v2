import { EmailInputField } from "@/components/EmailInputField";
import { FormTitle } from "@/components/FormTitle";
import { ResetButton } from "@/components/ResetButton";
import { SubmitButton } from "@/components/SubmitButton";
import { auth } from "@/config/firebaseConfig";
import { Box, Container, Paper, Skeleton } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export const EmailVerificationForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const handleChangeEmailField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEmail(event.target.value);
  const handleSubmitEmailVerification = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitButtonDisabled(true);
    sendPasswordResetEmail(auth, email)
      .then(() => router.push("/auth/email-verified"))
      .catch(() => setIsSubmitButtonDisabled(false));
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className="p-4 flex flex-col items-center">
        <FormTitle title="Reset your password" />
        <Box component="form" onSubmit={handleSubmitEmailVerification}>
          <EmailInputField onChangeEmailField={handleChangeEmailField} />
          <SubmitButton
            buttonText="Send Email"
            isSubmitButtonDisabled={isSubmitButtonDisabled}
          />
          <ResetButton />
        </Box>
      </Paper>
    </Container>
  );
};
