import { FormTitle } from "@/components/FormTitle";
import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import { EmailVerifiedFormAvatar } from "../stateless-components/EmailVerifiedAvatar";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import { ResetButton } from "@/components/ResetButton";
import { useEffect, useState } from "react";
import { Grow } from "@mui/material";

export const EmailVerifiedForm = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setShowForm(true), 100);
    return () => clearTimeout(delay);
  }, []);
  return (
    <Container maxWidth="xs">
      <Grow in={showForm} timeout={1000}>
        <Paper elevation={3} className="p-4 flex flex-col items-center">
          <EmailVerifiedFormAvatar />
          <FormTitle title="Email sent" />
          <p className="text-center text-base">
            Check your email and open the link we sent to continue
          </p>
          <ResetButton />
        </Paper>
      </Grow>
    </Container>
  );
};
