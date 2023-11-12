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
import { useEffect, useState } from "react";
import { ManagerModel } from "../model/ManagerModel";
import { listOfLanguages } from "../service/languages";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";

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
  const [translatorsList, setTranslatorsList] = useState<ManagerModel[]>([]);
  const [languagesList, setLanguagesList] = useState(listOfLanguages);
  const [targetLanguageList, setTargetLanguageList] = useState(listOfLanguages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://activity-monitoring-m950.onrender.com/users/translators", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTranslatorsList(data))
      .catch(() => setTranslatorsList([]))
      .finally(() => setLoading(false));
  }, []);

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
      .catch((error) => console.log(error))
      .finally(() => {
        setIsEditActivityButtonDisabled(false);
      });
  };

  const renderDialogContent = () => {
    return (
      <>
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
            options={languagesList.filter(
              (language) => language.value !== activityTargetLanguage
            )}
            value={languagesList.find(
              (language) => language.value === activityLanguage
            )}
            getOptionLabel={(option) => option.label}
            onChange={(e, newValue) => {
              if (newValue?.value) setActivityLanguage(newValue.value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Language"
              />
            )}
          />
          <Autocomplete
            options={targetLanguageList.filter(
              (language) => language.value !== activityLanguage
            )}
            value={targetLanguageList.find(
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
            options={translatorsList}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            value={translatorsList.find(
              (translator) => translator.id === activity.translator.id
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
      </>
    );
  };

  return (
    <Dialog open={isOpenModal} onClose={onCloseActivityModal} fullWidth={true}>
      {loading ? <GlobalLoadingSpinner /> : renderDialogContent()}
    </Dialog>
  );
};
