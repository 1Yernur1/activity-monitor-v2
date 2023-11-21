import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { ProjectModel } from "../model/ProjectModel";
import Link from "next/link";
import { MoreHorizOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ProjectView = ({ project }: { project: ProjectModel }) => {
  const router = useRouter();
  const { id, name } = project;
  const [anchorElForActionMenu, setAnchorElForActionMenu] =
    useState<HTMLElement | null>(null);
  const isOpenActionMenu = Boolean(anchorElForActionMenu);

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElForActionMenu(event.currentTarget);
  const handleCloseActionMenu = () => setAnchorElForActionMenu(null);

  const handleEditProject = () => {
    router.push(`/projects/${id}/edit`);
    handleCloseActionMenu();
  };

  const handleAddChief = () => {
    router.push(`/projects/${id}/add-chief`);
    handleCloseActionMenu();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={`/projects/${id}`}>{name}</Link>
        <IconButton onClick={handleOpenActionMenu}>
          <MoreHorizOutlined sx={{ color: "white" }} />
        </IconButton>
      </div>
      <Menu
        open={isOpenActionMenu}
        anchorEl={anchorElForActionMenu}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleEditProject}>Edit</MenuItem>
        <MenuItem onClick={handleAddChief}>Add Extra Chief Editor</MenuItem>
      </Menu>
    </>
  );
};
