"use client";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import { ActivityListBoard } from "./components/ActivityListBoard";

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <ActivityListBoard />
    </Suspense>
  );
}
