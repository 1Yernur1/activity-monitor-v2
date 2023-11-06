"use client";
import Container from "@mui/material/Container/Container";
import { SignInForm } from "./components/SignInForm";
import { Suspense, useContext, useLayoutEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function SignInPage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  useLayoutEffect(() => {
    if (authContext?.user) router.push("/home");
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Container className="h-screen grid place-items-center">
          <SignInForm />
        </Container>
      </main>
    </Suspense>
  );
}
