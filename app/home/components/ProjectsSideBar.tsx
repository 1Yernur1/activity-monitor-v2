import {
  AddCircleOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectEditModal } from "./ProjectEditModal";
import { ProjectCreateModal } from "./ProjectCreateModal";
import { ActivityModel } from "../model/ActivityModel";
import { ManagerModel } from "../model/ManagerModel";
import { ProjectModel } from "../model/ProjectModel";
import { useRouter } from "next/navigation";
import { ProjectAddExtraChiefEditorModal } from "./ProjectAddExtraChiefEditor";

export const ProjectsSideBar = ({
  onClickSelectProjectActivitiesList,
  onSelectProjectId,
  onIsLoadingActivitiesList,
  onSelectProjectData,
}: {
  onClickSelectProjectActivitiesList: (
    selectedActivityList: ActivityModel[]
  ) => void;
  onSelectProjectId: (selectedProjectId: number) => void;
  onIsLoadingActivitiesList: (isLoading: boolean) => void;
  onSelectProjectData: (selectedProjectData: ProjectModel) => void;
}) => {
  const [projectList, setProjectsList] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [showProjectCreateModal, setShowProjectCreateModal] = useState(false);
  const [chiefEditorsList, setChiefEditorsList] = useState<ManagerModel[]>([]);
  const [isOpenAddExtraChiefEditorModal, setIsOpenAddExtraChiefEditorModal] =
    useState(false);

  useEffect(() => {
    fetch("https://activity-monitoring-m950.onrender.com/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjectsList(data))
      .catch((error) => console.log(error));

    fetch(
      "https://activity-monitoring-m950.onrender.com/users/chiefEditors/free",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setChiefEditorsList(data))
      .catch(() => setChiefEditorsList([]));
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
    fetch(
      `https://activity-monitoring-m950.onrender.com/projects/${selectedId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => onSelectProjectData(data))
      .catch((err) => onSelectProjectData({} as ProjectModel));
  };

  const handleCloseAddExtraChiefEditorModal = () =>
    setIsOpenAddExtraChiefEditorModal(false);

  const handleClickAddExtraChiefEditorAction = () => {
    setIsOpenAddExtraChiefEditorModal(true);
    handleCloseActionMenu();
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
                  <MenuItem onClick={handleClickAddExtraChiefEditorAction}>
                    Add Extra Chief Editor
                  </MenuItem>
                </Menu>
                <ProjectEditModal
                  isOpenProjectEditModal={showProjectEditModal}
                  onCloseProjectEditModal={handleCloseProjectEditModal}
                  projectData={project}
                />
                <ProjectAddExtraChiefEditorModal
                  isOpenAddExtraChiefEditorModal={
                    isOpenAddExtraChiefEditorModal
                  }
                  onCloseAddExtraChiefEditorModal={
                    handleCloseAddExtraChiefEditorModal
                  }
                  projectId={project.id}
                />
              </div>
            ))}
        </Stack>
        {chiefEditorsList.length > 0 && (
          <div className="flex justify-end">
            <IconButton
              color="secondary"
              onClick={handleClickOpenProjectCreateModal}
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </div>
        )}

        <ProjectCreateModal
          showProjectCreateModal={showProjectCreateModal}
          onCloseProjectCreateModal={handleCloseProjectCreateModal}
        />
      </div>
    </div>
  );
};
