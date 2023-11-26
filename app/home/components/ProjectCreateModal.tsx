import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { ManagerModel } from "../model/ManagerModel";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
export const ProjectCreateModal = ({
  showProjectCreateModal,
  onCloseProjectCreateModal,
}: {
  showProjectCreateModal: boolean;
  onCloseProjectCreateModal: () => void;
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectChiefEditorId, setProjectChiefEditorId] = useState("");
  const [projectDeadlineTime, setProjectDeadline] = useState<Date | null>(null);
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

  const handleClickProjectCreateButton = () => {
    const body = {
      name: projectName,
      description: projectDescription,
      chiefEditorId: projectChiefEditorId,
      targetDate: projectDeadlineTime,
    };

    fetch(
      `https://activity-monitoring-m950.onrender.com/projects`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(() => {
        window.location.reload();
        onCloseProjectCreateModal();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsProjectEditButtonDisabled(false);
      });
  };
  return (
    <Dialog open={showProjectCreateModal} onClose={onCloseProjectCreateModal} fullWidth>
      <DialogTitle>Create Project</DialogTitle>
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
          options={chiefEditorsList}
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
          <div style={{marginTop: '16px'}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      label="Project Deadline"
                      value={projectDeadlineTime}
                      onChange={(newValue) => setProjectDeadline(newValue)}
                      // renderInput={(params) => (
                      //     <TextField
                      //         {...params}
                      //         variant="standard"
                      //         // value={projectDeadlineTime ? format(projectDeadlineTime, 'dd.MM.yyyy') : ''}
                      //     />
                      // )}
                  />
              </LocalizationProvider>
          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseProjectCreateModal}>Cancel</Button>
        <Button
          disabled={isProjectEditButtonDisabled}
          variant="contained"
          className="bg-black"
          onClick={handleClickProjectCreateButton}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
