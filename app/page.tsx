"use client";
import { SignInForm } from "./components/SignInForm";
import { Suspense, useContext, useLayoutEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { Header } from "@/components/Header";

export default function SignInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>
        <SignInForm />
      </main>
    </Suspense>
  );
}
