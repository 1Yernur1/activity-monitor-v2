import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectInfoModal } from "./ProjectInfoModal";

export const ActivityProject = ({ projectId }: { projectId: any }) => {
  const [projectData, setProjectData] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    fetch(
      `https://activity-monitoring-m950.onrender.com/projects/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data: any) => setProjectData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleCloseModal = () => setIsOpenModal(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <Typography variant="body1">Project:</Typography>
        <Button
          variant="contained"
          className="bg-black"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          {projectData && projectData.name}
        </Button>
      </div>
      {isOpenModal && (
        <ProjectInfoModal
          isOpenProjectModal={isOpenModal}
          projectData={projectData}
          onCloseProjectModal={handleCloseModal}
        />
      )}
    </>
  );
};
