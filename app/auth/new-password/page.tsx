"use client";
import { NewPasswordForm } from "./components/NewPasswordForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="h-screen grid place-items-center">
        <NewPasswordForm />
      </main>
    </Suspense>
  );
}
