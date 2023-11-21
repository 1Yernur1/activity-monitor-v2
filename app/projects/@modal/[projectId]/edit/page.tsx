"use client";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectEditModalView } from "../../components/EditModalView";
import { ProjectModel } from "@/app/projects/model/ProjectModel";
import { UserTypeModel } from "@/app/projects/model/UserTypeModel";
import {
  getAllFreeChiefEditors,
  getAllManagers,
  getProjectById,
} from "@/app/projects/service/fetcher";

export default function EditModal() {
  const router = useRouter();
  const { projectId } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [project, setProject] = useState<ProjectModel>({} as ProjectModel);
  const [managersList, setManagersList] = useState<UserTypeModel[]>([]);
  const [chiefEditorsList, setChiefEditorsList] = useState<UserTypeModel[]>([]);

  useEffect(() => {
    if (typeof projectId === "string")
      getProjectById(projectId)
        .then(handleThenGetProject)
        .catch(handleCatch)
        .finally(handleFinally);
    getAllManagers()
      .then(handleThenGetManagers)
      .catch(handleCatch)
      .finally(handleFinally);
    getAllFreeChiefEditors()
      .then((data: UserTypeModel[]) => handleGetFreeChiefEditors(data))
      .catch(() => handleCatchGetAllManagers())
      .finally(() => handleFinallyGetAllManagers());
  }, [isLoading]);

  const handleThenGetProject = (project: ProjectModel) => setProject(project);
  const handleThenGetManagers = (fetchedManagers: UserTypeModel[]) =>
    setManagersList(fetchedManagers);
  const handleCatch = () => setIsError(true);
  const handleFinally = () => setIsLoading(false);
  const handleCatchGetAllManagers = () => setIsError(true);
  const handleFinallyGetAllManagers = () => setIsLoading(false);
  const handleGetFreeChiefEditors = (fetchedChiefEditors: UserTypeModel[]) =>
    setChiefEditorsList(fetchedChiefEditors);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTimeout(() => router.back(), 100);
  };

  const content = !(isLoading || isError) && (
    <ProjectEditModalView
      {...{ project, managersList, chiefEditorsList, handleCloseModal }}
    />
  );

  const loading = isLoading && (
    <DialogContent>
      <Typography>Loading...</Typography>
    </DialogContent>
  );
  const error = isError && (
    <DialogContent>
      <Typography>Something wrong</Typography>
    </DialogContent>
  );

  return (
    <Dialog fullWidth open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>Edit Project</DialogTitle>
      {loading}
      {content}
      {error}
    </Dialog>
  );
}
