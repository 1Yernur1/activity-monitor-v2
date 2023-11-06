"use client";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import Loading from "./loading";

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <h1>This is home page</h1>
    </Suspense>
  );
}
