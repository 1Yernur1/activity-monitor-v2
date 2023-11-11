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

export const ActivityCreateModal = ({
  showActivityCreateModal,
  onCloseActivityCreateModal,
}: {
  showActivityCreateModal: boolean;
  onCloseActivityCreateModal: () => void;
}) => {
  const [activityTitle, setActivityTitle] = useState("");
  const [activityLanguage, setActivityLanguage] = useState("");
  const [activityTargetLanguage, setActivityTargetLanguage] = useState("");
  const [activityTranslator, setActivityTranslator] = useState("");
  const [isCreateActivityButtonDisabled, setIsCreateActivityButtonDisabled] =
    useState(false);

  const handleClickCreateActivityButton = () => {
    setIsCreateActivityButtonDisabled(true);
    const body = {
      projectId: 1,
      title: activityTitle,
      language: activityLanguage,
      targetLanguage: activityTargetLanguage,
      translatorId: activityTranslator,
    };
    fetch("https://activity-monitoring-m950.onrender.com/activities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        onCloseActivityCreateModal();
        window.location.reload();
      })
      .catch(() => {})
      .finally(() => {
        setIsCreateActivityButtonDisabled(false);
      });
  };

  const languages = [
    {
      label: "English",
      value: "EN",
    },
    {
      label: "Russian",
      value: "RU",
    },
    {
      label: "French",
      value: "FN",
    },
    {
      label: "Kazakh",
      value: "KZ",
    },
  ];

  const translators = [
    { id: "XH4Powot0ve0fiCfi2B7197wuTD2", fullName: "Aldiyar Issenbayev" },
  ];
  return (
    <Dialog
      open={showActivityCreateModal}
      onClose={onCloseActivityCreateModal}
      fullWidth={true}
    >
      <DialogTitle>Create Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          type="text"
          margin="dense"
          variant="standard"
          fullWidth
          onChange={(e) => setActivityTitle(e.target.value)}
        />
        <Autocomplete
          options={languages}
          getOptionLabel={(option) => option.label}
          onChange={(e, newValue) => {
            if (newValue?.value) setActivityLanguage(newValue.value);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Select Language" />
          )}
        />
        <Autocomplete
          options={languages}
          getOptionLabel={(option) => option.label}
          onChange={(e, newValue) => {
            if (newValue?.value) setActivityTargetLanguage(newValue.value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Select Target Language"
            />
          )}
        />
        <Autocomplete
          options={translators}
          getOptionLabel={(option) => option.fullName}
          onChange={(e, newValue) => {
            if (newValue?.id) setActivityTranslator(newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Select Translator"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseActivityCreateModal}>Cancel</Button>
        <Button
          disabled={isCreateActivityButtonDisabled}
          onClick={handleClickCreateActivityButton}
          variant="contained"
          className="bg-black"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
