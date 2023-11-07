"use client";
import { NewPasswordForm } from "./components/NewPasswordForm";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "@/components/Header";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>
        <NewPasswordForm />
      </main>
    </Suspense>
  );
}
