"use client";
import { Suspense, useState } from "react";
import Loading from "./loading";
import { ActivityListBoard } from "./components/ActivityListBoard";
import { ActivityCreateModal } from "./components/ActivityCreateDialog";
import { HomeHeader } from "./components/HomeHeader";
import { ProjectsDrawer } from "./components/ProjectsDrawer";
import { ProjectsSideBar } from "./components/ProjectsSideBar";

export default function HomePage() {
  const [showActivityCreateModal, setShowActivityCreateModal] = useState(false);

  const handleCloseActivityCreateModal = () =>
    setShowActivityCreateModal(false);

  return (
    <Suspense fallback={<Loading />}>
      <HomeHeader setShowActivityCreateModal={setShowActivityCreateModal} />
      <div className="h-full pt-16 grid grid-cols-6">
        <ProjectsSideBar/>
        <ActivityListBoard />
      </div>
      <ActivityCreateModal
        showActivityCreateModal={showActivityCreateModal}
        onCloseActivityCreateModal={handleCloseActivityCreateModal}
      />
    </Suspense>
  );
}
