import {
  AddCircleOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectEditModal } from "./ProjectEditModal";
import { ProjectCreateModal } from "./ProjectCreateModal";
import { ActivityModel } from "../model/ActivityModel";

export const ProjectsSideBar = ({
  onClickSelectProjectActivitiesList,
  onSelectProjectId,
  onIsLoadingActivitiesList,
}: {
  onClickSelectProjectActivitiesList: (
    selectedActivityList: ActivityModel[]
  ) => void;
  onSelectProjectId: (selectedProjectId: number) => void;
  onIsLoadingActivitiesList: (isLoading: boolean) => void;
}) => {
  const [projectList, setProjectsList] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [showProjectCreateModal, setShowProjectCreateModal] = useState(false);

  useEffect(() => {
    fetch("https://activity-monitoring-m950.onrender.com/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjectsList(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClickHorizontalMenuIcon = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => setAnchorEl(event.currentTarget);

  const handleCloseActionMenu = () => setAnchorEl(null);

  const handleCloseProjectEditModal = () => setShowProjectEditModal(false);

  const handleClickProjectEditAction = () => {
    setShowProjectEditModal(true);
    handleCloseActionMenu();
  };

  const handleCloseProjectCreateModal = () => setShowProjectCreateModal(false);

  const handleClickOpenProjectCreateModal = () =>
    setShowProjectCreateModal(true);

  const handleClickProject = (selectedId: number) => {
    onIsLoadingActivitiesList(true);
    fetch(
      `https://activity-monitoring-m950.onrender.com/activities/project/${selectedId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => onClickSelectProjectActivitiesList(data))
      .catch((err) => onClickSelectProjectActivitiesList([]))
      .finally(() => {
        onSelectProjectId(selectedId);
        onIsLoadingActivitiesList(false);
      });
  };

  return (
    <div className="bg-black text-white col-start-1 col-end-2 row-span-full">
      <div className="py-1 px-6">
        <Stack>
          {projectList.length > 0 &&
            projectList.map((project: any) => (
              <div key={project.id}>
                <div className="flex justify-between items-center">
                  <Typography
                    component={"button"}
                    onClick={(e) => handleClickProject(project.id)}
                  >
                    {project.name}
                  </Typography>
                  <IconButton onClick={handleClickHorizontalMenuIcon}>
                    <MoreHorizOutlined sx={{ color: "white" }} />
                  </IconButton>
                </div>
                <Menu
                  open={isOpen}
                  anchorEl={anchorEl}
                  onClose={handleCloseActionMenu}
                >
                  <MenuItem onClick={handleClickProjectEditAction}>
                    Edit
                  </MenuItem>
                </Menu>
                <ProjectEditModal
                  isOpenProjectEditModal={showProjectEditModal}
                  onCloseProjectEditModal={handleCloseProjectEditModal}
                  projectData={project}
                />
              </div>
            ))}
        </Stack>
        <div className="flex justify-end">
          <IconButton
            color="secondary"
            onClick={handleClickOpenProjectCreateModal}
          >
            <AddCircleOutlineOutlined />
          </IconButton>
        </div>
        <ProjectCreateModal
          showProjectCreateModal={showProjectCreateModal}
          onCloseProjectCreateModal={handleCloseProjectCreateModal}
        />
      </div>
    </div>
  );
};