import { useEffect, useState } from "react";
import { ManagerModel } from "../model/ManagerModel";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const ProjectAddExtraChiefEditorModal = ({
  isOpenAddExtraChiefEditorModal,
  onCloseAddExtraChiefEditorModal,
  projectId,
}: {
  isOpenAddExtraChiefEditorModal: boolean;
  onCloseAddExtraChiefEditorModal: () => void;
  projectId: number;
}) => {
  const [chiefEditorsList, setChiefEditorsList] = useState<ManagerModel[]>([]);
  const [chiefEditorId, setChiefEditorId] = useState("");
  const [
    isAddExtraChiefEditorButtonDisabled,
    setIsAddExtraChiefEditorButtonDisabled,
  ] = useState(false);

  useEffect(() => {
    fetch(
      `https://activity-monitoring-m950.onrender.com/users/chiefEditors/toAssignAsExtraToProject/${projectId}`,
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

  const handleClickAddExtraChiefEditorButton = () => {
    setIsAddExtraChiefEditorButtonDisabled(true);
    fetch(
      `https://activity-monitoring-m950.onrender.com/projects/${projectId}/extraChiefEditors/${chiefEditorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
        onCloseAddExtraChiefEditorModal();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAddExtraChiefEditorButtonDisabled(false));
  };

  return (
    <Dialog
      open={isOpenAddExtraChiefEditorModal}
      onClose={onCloseAddExtraChiefEditorModal}
      fullWidth
    >
      <DialogTitle>Extra Chief Editor</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={chiefEditorsList}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(e, newValue) => {
            if (newValue?.id) setChiefEditorId(newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Add Chief Editor"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAddExtraChiefEditorModal}>Cancel</Button>
        <Button
          disabled={isAddExtraChiefEditorButtonDisabled}
          variant="contained"
          className="bg-black"
          onClick={handleClickAddExtraChiefEditorButton}
        >
          Add Extra Chief Editor
        </Button>
      </DialogActions>
    </Dialog>
  );
};
