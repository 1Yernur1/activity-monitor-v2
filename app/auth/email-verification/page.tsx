"use client";
import { EmailVerificationForm } from "./components/EmailVerificationForm";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "@/components/Header";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>
        <EmailVerificationForm />
      </main>
    </Suspense>
  );
}
