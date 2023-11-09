import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import { SignInFormAvatar } from "../stateless-components/SignInFormAvatar";
import { FormTitle } from "../../components/FormTitle";
import { Box, Grow } from "@mui/material";
import { EmailInputField } from "../../components/EmailInputField";
import { PasswordInputField } from "@/components/PasswordInputField";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { SubmitButton } from "../../components/SubmitButton";
import { FormErrorText } from "../../components/FormErrorText";
import { SignInFormOptions } from "../stateless-components/SignInFormOptions";
import { AuthContext, User } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { singInWithEmailAndPassword } from "../service/fetcher";

export const SignInForm = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [isErrorSignIn, setIsErrorSignIn] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setShowForm(true), 100);
    return () => clearTimeout(delay);
  }, []);

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitButtonDisabled(true);
    singInWithEmailAndPassword(email, password)
      .then((data: User) => {
        authContext?.setUser(data);
        localStorage.setItem("idToken", data.idToken);
        router.push("/home");
      })
      .catch(() => setIsErrorSignIn(true))
      .finally(() => setIsSubmitButtonDisabled(false));
  };

  const handleChangeEmailField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEmail(event.target.value);

  const handleChangePasswordField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPassword(event.target.value);

  const handleCheckRememberMe = () => setIsRememberMe(!isRememberMe);

  return (
    <Container maxWidth={"xs"}>
      <Grow in={showForm} timeout={1000}>
        <Paper elevation={3} className="p-4 flex flex-col items-center">
          <SignInFormAvatar />
          <FormTitle title="Sign In" />
          <Box component="form" onSubmit={handleSignIn}>
            {isErrorSignIn && (
              <FormErrorText errorText="Wrong Email or Password" />
            )}
            <EmailInputField
              onChangeEmailField={handleChangeEmailField}
              isErrorEmailsField={isErrorSignIn}
            />
            <PasswordInputField
              onChangePasswordField={handleChangePasswordField}
              isErrorPasswordField={isErrorSignIn}
            />
            <SignInFormOptions onCheckRememberMe={handleCheckRememberMe} />
            <SubmitButton
              buttonText="Sign in"
              isSubmitButtonDisabled={isSubmitButtonDisabled}
            />
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};
