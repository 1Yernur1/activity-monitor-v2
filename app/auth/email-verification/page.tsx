"use client";
import { EmailVerificationForm } from "./components/EmailVerificationForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="h-screen grid place-items-center">
        <EmailVerificationForm />
      </main>
    </Suspense>
  );
}
