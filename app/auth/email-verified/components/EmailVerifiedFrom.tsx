import { FormTitle } from "@/components/FormTitle";
import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import { EmailVerifiedFormAvatar } from "../stateless-components/EmailVerifiedAvatar";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import { ResetButton } from "@/components/ResetButton";

export const EmailVerifiedForm = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className="p-4 flex flex-col items-center">
        <EmailVerifiedFormAvatar />
        <FormTitle title="Email sent" />
        <FormHelperText className="text-center text-base">
          Check your email and open the link we sent to continue
        </FormHelperText>
        <ResetButton />
      </Paper>
    </Container>
  );
};
