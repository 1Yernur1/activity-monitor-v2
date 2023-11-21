import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { UserTypeModel } from "../../model/UserTypeModel";
import {
  getAllFreeChiefEditors,
  getAllManagers,
  getProjectById,
} from "../../service/fetcher";
import { useParams } from "next/navigation";
import { ProjectModel } from "../../model/ProjectModel";
import { EditModalProps } from "./props";

export const ProjectEditModalView = ({
  project,
  managersList,
  chiefEditorsList,
  handleCloseModal,
}: EditModalProps) => {
  const [editedProject, setEditedProject] = useState({});
  const { name } = project;

  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedProject((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };
  return (
    <>
      <DialogContent>
        <TextField
          label="Project name"
          type="text"
          margin="dense"
          variant="standard"
          fullWidth
          value={name}
          onChange={handleChangeName}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button>Edit</Button>
      </DialogActions>
    </>
  );
};
