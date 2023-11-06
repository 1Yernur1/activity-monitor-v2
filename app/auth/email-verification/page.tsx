"use client";
import { Container } from "@mui/material";
import { EmailVerificationForm } from "./components/EmailVerificationForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Container className="h-screen grid place-items-center">
          <EmailVerificationForm />
        </Container>
      </main>
    </Suspense>
  );
}
