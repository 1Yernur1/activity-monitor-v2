import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const ChangeActivityStatusModal = ({
  showChangeStatusActivityModal,
  onCloseChangeActivityModal,
  activityStatus,
  activityId,
}: {
  showChangeStatusActivityModal: boolean;
  onCloseChangeActivityModal: () => void;
  activityStatus: string;
  activityId: number;
}) => {
  const [
    isSaveActivityStatusButtonDisabled,
    setIsSaveActivityStatusButtonDisabled,
  ] = useState(false);
  const [status, setStatus] = useState(activityStatus);

  const statusList = [
    { label: "Backlog", value: "NEW" },
    { label: "To do", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "In progress from review", value: "IN_PROGRESS_FROM_REVIEW" },
    { label: "Review", value: "REVIEW" },
    { label: "Done", value: "DONE" },
  ];

  const handleSaveActivityStatus = () => {
    setIsSaveActivityStatusButtonDisabled(true);
    const body = {
      status: status,
    };
    fetch(
      `https://activity-monitoring-m950.onrender.com/activities/${activityId}/updateByManager/status`,
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
        onCloseChangeActivityModal();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSaveActivityStatusButtonDisabled(false));
  };
  return (
    <Dialog
      open={showChangeStatusActivityModal}
      onClose={onCloseChangeActivityModal}
      fullWidth
    >
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={statusList}
          value={statusList.find(
            (statusInList) => statusInList.value === status
          )}
          getOptionLabel={(option) => option.label}
          onChange={(e, newValue) => {
            if (newValue?.value) setStatus(newValue.value);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Select status" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseChangeActivityModal}>Cancel</Button>
        <Button
          disabled={isSaveActivityStatusButtonDisabled}
          onClick={handleSaveActivityStatus}
          variant="contained"
          className="bg-black"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};