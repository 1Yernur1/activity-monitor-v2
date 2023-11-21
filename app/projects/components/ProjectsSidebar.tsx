import { useEffect, useState } from "react";
import { getAllProjects } from "../service/fetcher";
import { ProjectModel } from "../model/ProjectModel";
import { Typography } from "@mui/material";
import { ProjectsListView } from "./ProjectsListView";
import { ProjectAddButton } from "./ProjectAddButton";

export const ProjectsSidebar =  () => {
  const [projectsList, setProjectsLIst] = useState<ProjectModel[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isErrorGetAllProjects, setErrorGetAllProjects] = useState(false);

  // const projects = await getAllProjects();

  useEffect(() => {
    getAllProjects()
      .then((data: ProjectModel[]) => handleThenGetAllProjects(data))
      .catch(() => handleCatchGetAllProjects())
      .finally(() => handleFinallyGetAllProjects());
  }, [isLoadingProjects]);

  const handleThenGetAllProjects = (selectedProjectList: ProjectModel[]) =>
    setProjectsLIst(selectedProjectList);
  const handleCatchGetAllProjects = () => setErrorGetAllProjects(true);
  const handleFinallyGetAllProjects = () => setIsLoadingProjects(false);

  const content = !(isLoadingProjects || isErrorGetAllProjects) && (
    <>
      <ProjectsListView projectList={projectsList} />
      <ProjectAddButton />
    </>
  );
  const loading = isLoadingProjects && <Typography>Loading...</Typography>;
  const error = isErrorGetAllProjects && <Typography>Error...</Typography>;

  return (
    <div className="py-1 px-6">
      {loading}
      {content}
      {error}
    </div>
  );
};
