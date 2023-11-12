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
import { listOfLanguages } from "../service/languages";
import { ManagerModel } from "../model/ManagerModel";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";

export const ActivityCreateModal = ({
  showActivityCreateModal,
  onCloseActivityCreateModal,
  projectId,
}: {
  showActivityCreateModal: boolean;
  onCloseActivityCreateModal: () => void;
  projectId: number;
}) => {
  const [activityTitle, setActivityTitle] = useState("");
  const [activityLanguage, setActivityLanguage] = useState("");
  const [activityTargetLanguage, setActivityTargetLanguage] = useState("");
  const [activityTranslator, setActivityTranslator] = useState("");
  const [isCreateActivityButtonDisabled, setIsCreateActivityButtonDisabled] =
    useState(false);
  const [languagesList, setLanguagesList] = useState(listOfLanguages);
  const [targetLanguageList, setTargetLanguageList] = useState(listOfLanguages);
  const [translatorsList, setTranslatorsList] = useState<ManagerModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://activity-monitoring-m950.onrender.com/users/translators", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTranslatorsList(data))
      .catch(() => setTranslatorsList([]))
      .finally(() => setLoading(false));
  }, []);

  const handleClickCreateActivityButton = () => {
    setIsCreateActivityButtonDisabled(true);
    const body = {
      projectId: projectId,
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

  const renderDialogContent = () => {
    return (
      <>
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
            options={languagesList.filter(
              (language) => language.value !== activityTargetLanguage
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
      </>
    );
  };
  return (
    <Dialog
      open={showActivityCreateModal}
      onClose={onCloseActivityCreateModal}
      fullWidth={true}
    >
      {loading ? <GlobalLoadingSpinner /> : renderDialogContent()}
    </Dialog>
  );
};
