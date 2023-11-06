"use client";
import Container from "@mui/material/Container/Container";
import { NewPasswordForm } from "./components/NewPasswordForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <Container className="h-screen grid place-items-center">
          <NewPasswordForm />
        </Container>
      </main>
    </Suspense>
  );
}
