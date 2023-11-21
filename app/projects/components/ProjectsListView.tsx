import { Menu, MenuItem, Typography } from "@mui/material";
import { ProjectModel } from "../model/ProjectModel";
import { ProjectView } from "./ProjectView";

export const ProjectsListView = ({
  projectList,
}: {
  projectList: ProjectModel[];
}) => {
  if (projectList.length === 0) {
    return <Typography>No projects</Typography>;
  }

  return (
    <div>
      {projectList.map((project) => (
        <ProjectView key={project.id} project={project} />
      ))}
    </div>
  );
};
