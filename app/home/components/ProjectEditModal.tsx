import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ManagerModel } from "../model/ManagerModel";

export const ProjectEditModal = ({
  isOpenProjectEditModal,
  projectData,
  onCloseProjectEditModal,
}: {
  isOpenProjectEditModal: boolean;
  projectData: any;
  onCloseProjectEditModal: () => void;
}) => {
  const [projectName, setProjectName] = useState(projectData.name);
  const [projectDescription, setProjectDescription] = useState(
    projectData.description
  );
  const [projectManagerId, setProjectManagerId] = useState(
    projectData.manager.id
  );
  const [projectChiefEditorId, setProjectChiefEditorId] = useState(
    projectData.chiefEditor.id
  );
  const [isProjectEditButtonDisabled, setIsProjectEditButtonDisabled] =
    useState(false);

  const [managersList, setManagerList] = useState<ManagerModel[]>([]);

  const [chiefEditorsList, setChiefEditorsList] = useState<ManagerModel[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://activity-monitoring-m950.onrender.com/users/projectManagers",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setManagerList(data))
      .catch(() => setManagerList([]));
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

  const handleClickProjectEditButton = () => {
    const body = {
      name: projectName,
      description: projectDescription,
      managerId: projectManagerId,
      chiefEditorId: projectChiefEditorId,
    };

    fetch(
      `https://activity-monitoring-m950.onrender.com/projects/${projectData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(() => {
        window.location.reload();
        onCloseProjectEditModal();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsProjectEditButtonDisabled(false);
      });
  };

  return (
    <Dialog
      open={isOpenProjectEditModal}
      onClose={onCloseProjectEditModal}
      fullWidth
    >
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <TextField
          label="Project name"
          type="text"
          margin="dense"
          variant="standard"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Autocomplete
          options={managersList}
          value={managersList.find(
            (manager) => manager.id === projectData.manager.id
          )}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(e, newValue) => {
            if (newValue?.id) setProjectManagerId(newValue.id);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Select Manager" />
          )}
        />
        <Autocomplete
          options={chiefEditorsList}
          value={chiefEditorsList.find(
            (chiefEditor) => chiefEditor.id === projectData.chiefEditor.id
          )}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(e, newValue) => {
            if (newValue?.id) setProjectChiefEditorId(newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Select Chief Editor"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseProjectEditModal}>Cancel</Button>
        <Button
          disabled={isProjectEditButtonDisabled}
          variant="contained"
          className="bg-black"
          onClick={handleClickProjectEditButton}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
