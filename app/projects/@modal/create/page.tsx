"use client";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllFreeChiefEditors, getAllManagers } from "../../service/fetcher";
import { UserTypeModel } from "../../model/UserTypeModel";
import { ProjectCreateModalView } from "../components/CreateModalView";

export default function CreateProjectModal() {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [isErrorGetAllManagers, setIsErrorGetAllManagers] = useState(false);
  const [chiefEditorsList, setChiefEditorsList] = useState<UserTypeModel[]>([]);

  useEffect(() => {
    getAllFreeChiefEditors()
      .then((data: UserTypeModel[]) => handleGetFreeChiefEditors(data))
      .catch(() => handleCatchGetAllManagers())
      .finally(() => handleFinallyGetAllManagers());
  }, [isLoadingModal]);

  const handleCatchGetAllManagers = () => setIsErrorGetAllManagers(true);
  const handleFinallyGetAllManagers = () => setIsLoadingModal(false);
  const handleGetFreeChiefEditors = (fetchedChiefEditors: UserTypeModel[]) =>
    setChiefEditorsList(fetchedChiefEditors);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTimeout(() => router.back(), 100);
  };

  const content = !(isLoadingModal || isErrorGetAllManagers) && (
    <ProjectCreateModalView {...{ chiefEditorsList, handleCloseModal }} />
  );

  const loading = isLoadingModal && (
    <DialogContent>
      <Typography>Loading...</Typography>
    </DialogContent>
  );
  const error = isErrorGetAllManagers && (
    <DialogContent>
      <Typography>Something wrong</Typography>
    </DialogContent>
  );

  return (
    <Dialog fullWidth open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>Create Project</DialogTitle>
      {loading}
      {content}
      {error}
    </Dialog>
  );
}
