"use client";
import { Suspense, useState } from "react";
import Loading from "./loading";
import { ActivityListBoard } from "./components/ActivityListBoard";
import { ActivityCreateModal } from "./components/ActivityCreateDialog";
import { HomeHeader } from "./components/HomeHeader";

export default function HomePage() {
  const [showActivityCreateModal, setShowActivityCreateModal] = useState(false);

  const handleCloseActivityCreateModal = () =>
    setShowActivityCreateModal(false);

  return (
    <Suspense fallback={<Loading />}>
      <HomeHeader setShowActivityCreateModal={setShowActivityCreateModal} />
      <ActivityListBoard />
      <ActivityCreateModal
        showActivityCreateModal={showActivityCreateModal}
        onCloseActivityCreateModal={handleCloseActivityCreateModal}
      />
    </Suspense>
  );
}
