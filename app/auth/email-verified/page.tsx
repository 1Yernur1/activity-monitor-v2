"use client";
import { EmailVerifiedForm } from "./components/EmailVerifiedFrom";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "@/components/Header";

export default function EmailVerifiedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>
        <EmailVerifiedForm />
      </main>
    </Suspense>
  );
}
