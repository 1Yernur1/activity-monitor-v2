import { UserTypeModel } from "@/app/projects/model/UserTypeModel";
import { createProject } from "@/app/projects/service/fetcher";
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const ProjectCreateModalView = async ({
  chiefEditorsList,
  handleCloseModal,
}: {
  chiefEditorsList: UserTypeModel[];
  handleCloseModal: () => void;
}) => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [editorId, setEditorId] = useState("");
  const [isError, setIsError] = useState(false);
  const [createBtnDisabled, setCreateBtnDisabled] = useState(false);

  const handleChangeChiefEditor = (selectedManager: UserTypeModel | null) => {
    if (selectedManager?.id) setEditorId(selectedManager.id);
  };
  const handleChangeProjectName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setProjectName(e.target.value);

  const handleThenCreateProject = () => {
    // setTimeout(() => router.push("/projects/1"), 100);
    revalidatePath("/projects/1");
  };
  const handleCatchCreateProject = () => setIsError(true);
  const handleFinallyCreateProject = () => setCreateBtnDisabled(false);

  const handleCreateProject = () => {
    handleThenCreateProject();
    setCreateBtnDisabled(true);
    const body = {
      name: projectName,
      description: "Placeholder Description",
      chiefEditorId: editorId,
    };
    createProject(body)
      .then(() => handleThenCreateProject())
      .catch(() => handleCatchCreateProject())
      .finally(() => handleFinallyCreateProject());
  };

  return (
    <>
      <DialogContent>
        {isError && <Typography color={"red"}>Something wrong!</Typography>}
        <TextField
          label="Project name"
          type="text"
          margin="dense"
          variant="standard"
          value={projectName}
          fullWidth
          onChange={handleChangeProjectName}
        />
        <Autocomplete
          options={chiefEditorsList}
          getOptionLabel={({ firstName, lastName }) =>
            `${firstName} ${lastName}`
          }
          onChange={(e, newValue) => handleChangeChiefEditor(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={editorId}
              variant="standard"
              label="Select Chief Editor"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button
          variant="contained"
          className="bg-black"
          disabled={createBtnDisabled}
          onClick={handleCreateProject}
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
};
