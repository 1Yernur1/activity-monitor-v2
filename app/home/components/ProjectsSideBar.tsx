import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

export const ProjectsSideBar = () => {
  const [projectList, setProjectsList] = useState([]);
  useEffect(() => {
    fetch("https://activity-monitoring-m950.onrender.com/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjectsList(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="bg-black text-white col-start-1 col-end-2">
      <Stack>
        {projectList.map((project: any) => (<div className="py-1 px-2">{project.name}</div>))}
      </Stack>
    </div>
  );
};
