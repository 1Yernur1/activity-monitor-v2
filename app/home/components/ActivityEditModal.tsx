import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ActivityModel } from "../model/ActivityModel";
import { useState } from "react";

export const ActivityEditModal = ({
  isOpenModal,
  activity,
  onCloseActivityModal,
}: {
  isOpenModal: boolean;
  activity: ActivityModel;
  onCloseActivityModal: () => void;
}) => {
  const [activityTitle, setActivityTitle] = useState(activity.title);
  const [activityLanguage, setActivityLanguage] = useState(activity.language);
  const [activityTargetLanguage, setActivityTargetLanguage] = useState(
    activity.targetLanguage
  );
  const [activityTranslator, setActivityTranslator] = useState(
    activity.translator.id
  );

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
  const [isEditActivityButtonDisabled, setIsEditActivityButtonDisabled] =
    useState(false);

  const handleClickEditActivityButton = () => {
    setIsEditActivityButtonDisabled(true);
    const body = {
      title: activityTitle,
      language: activityLanguage,
      targetLanguage: activityTargetLanguage,
      translatorId: activityTranslator,
    };
    fetch(
      `https://activity-monitoring-m950.onrender.com/activities/${activity.id}/updateByManager`,
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
        onCloseActivityModal();
      })
      .catch(() => {})
      .finally(() => {
        setIsEditActivityButtonDisabled(false);
      });
  };
  return (
    <Dialog open={isOpenModal} onClose={onCloseActivityModal} fullWidth={true}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          type="text"
          margin="dense"
          variant="standard"
          fullWidth
          value={activityTitle}
          onChange={(e) => setActivityTitle(e.target.value)}
        />
        <Autocomplete
          options={languages}
          value={languages.find(
            (language) => language.value === activityLanguage
          )}
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
          value={languages.find(
            (language) => language.value === activityTargetLanguage
          )}
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
          value={translators.find(
            (translator) =>
              translator.fullName ===
              `${activity.translator.firstName} ${activity.translator.lastName}`
          )}
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
        <Button onClick={onCloseActivityModal}>Cancel</Button>
        <Button
          disabled={isEditActivityButtonDisabled}
          onClick={handleClickEditActivityButton}
          variant="contained"
          className="bg-black"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
