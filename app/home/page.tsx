"use client";
import { Header } from "@/components/Header";
import { Suspense, useContext, useLayoutEffect } from "react";
import Loading from "./loading";
import { ActivityListBoard } from "./components/ActivityListBoard";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function HomePage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  
  useLayoutEffect(() => {
    if (!authContext?.user) router.push("/");
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <ActivityListBoard />
    </Suspense>
  );
}
