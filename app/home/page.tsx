"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { ActivityListBoard } from "./components/ActivityListBoard";
import { ActivityCreateModal } from "./components/ActivityCreateDialog";
import { HomeHeader } from "./components/HomeHeader";
import { ProjectsSideBar } from "./components/ProjectsSideBar";
import { jwtDecode } from "jwt-decode";
import { ActivityModel } from "./model/ActivityModel";
import { ProjectModel } from "./model/ProjectModel";

export default function HomePage() {
  const [showActivityCreateModal, setShowActivityCreateModal] = useState(false);
  const [activitiesList, setActivitiesList] = useState<ActivityModel[]>([]);
  const [projectId, setProjectId] = useState(1);
  const [isLoadingActivitiesList, setIsLoadingActivitiesList] = useState(false);
  const [projectData, setProjectData] = useState<ProjectModel>({} as ProjectModel);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      const decodedToken = jwtDecode(token);
    }
    setIsLoadingActivitiesList(true);
    fetch(
      `https://activity-monitoring-m950.onrender.com/activities/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setActivitiesList(data))
      .catch((err) => setActivitiesList([]))
      .finally(() => {
        setIsLoadingActivitiesList(false);
      });
    fetch(
      `https://activity-monitoring-m950.onrender.com/projects/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((err) => setProjectData({} as ProjectModel))
      .finally(() => setIsLoadingActivitiesList(false));
  }, []);
  const handleCloseActivityCreateModal = () =>
    setShowActivityCreateModal(false);

  const handleSetActivitiesList = (selectedActivitiesList: ActivityModel[]) =>
    setActivitiesList(selectedActivitiesList);

  const handleSelectProjectId = (selectedProjectId: number) =>
    setProjectId(selectedProjectId);

  const handleIsLoadingActivitiesList = (isLoading: boolean) =>
    setIsLoadingActivitiesList(isLoading);

  const handleSelectProjectData = (selectedProjectData: ProjectModel) =>
    setProjectData(selectedProjectData);

  return (
    <Suspense fallback={<Loading />}>
      <HomeHeader setShowActivityCreateModal={setShowActivityCreateModal} />
      <div className="h-full pt-16 grid grid-cols-6">
        <ProjectsSideBar
          onClickSelectProjectActivitiesList={handleSetActivitiesList}
          onSelectProjectId={handleSelectProjectId}
          onIsLoadingActivitiesList={handleIsLoadingActivitiesList}
          onSelectProjectData={handleSelectProjectData}
        />
        <ActivityListBoard
          activitiesList={activitiesList}
          isLoadingActivitiesList={isLoadingActivitiesList}
          projectData={projectData}
        />
      </div>
      <ActivityCreateModal
        showActivityCreateModal={showActivityCreateModal}
        onCloseActivityCreateModal={handleCloseActivityCreateModal}
        projectId={projectId}
      />
    </Suspense>
  );
}
