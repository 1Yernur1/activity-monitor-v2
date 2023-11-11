import {
  AddCircleOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectEditModal } from "./ProjectEditModal";
import { ProjectCreateModal } from "./ProjectCreateModal";

export const ProjectsSideBar = () => {
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

  const handleCloseProjectCreateModal = () => setShowProjectEditModal(false);

  const handleClickOpenProjectCreateModal = () => setShowProjectCreateModal(true);

  return (
    <div className="bg-black text-white col-start-1 col-end-2">
      <div className="py-1 px-6">
        <Stack>
          {projectList.length > 0 &&
            projectList.map((project: any) => (
              <div key={project.id}>
                <div className="flex justify-between items-center">
                  <Typography>{project.name}</Typography>
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
