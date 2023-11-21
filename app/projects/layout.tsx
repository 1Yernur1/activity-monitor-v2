"use client";
import { ReactNode } from "react";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { Header } from "./components/Header";

export default function ProjectsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="h-screen grid grid-cols-6 grid-rows-xs xs:grid-rows-projects">
        <div className="col-span-full ">
          <Header />
        </div>
        <div className="bg-black text-white">
          <ProjectsSidebar />
        </div>
        <div>{children}</div>
      </div>
      {modal}
    </>
  );
}
