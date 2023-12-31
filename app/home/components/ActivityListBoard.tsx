import { useEffect, useState } from "react";
import { getAllActivitiesFromServer } from "../service/fetcher";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";
import { ActivityModel } from "../model/ActivityModel";
import { ActivityColumn } from "./ActivityColumn";
import { Typography } from "@mui/material";
import { ProjectModel } from "../model/ProjectModel";

export const ActivityListBoard = ({
  activitiesList,
  isLoadingActivitiesList,
  projectData,
}: {
  activitiesList: ActivityModel[];
  isLoadingActivitiesList: boolean;
  projectData: ProjectModel;
}) => {
  if (isLoadingActivitiesList) {
    return <GlobalLoadingSpinner />;
  }

  return (
    <div className="overflow-auto h-full col-start-2 col-span-full">
      {projectData.chiefEditor && (
        <div className="px-4 mb-2 pt-2">
          <Typography variant="body1" fontWeight={500}>
            {projectData.name}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            <span className="font-normal">Chief editor:</span>{" "}
            {`${projectData.chiefEditor.firstName} ${projectData.chiefEditor.lastName}`}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            <span className="font-normal">Project Manager:</span>{" "}
            {`${projectData.manager.firstName} ${projectData.manager.lastName}`}
          </Typography>
          {projectData.extraChiefEditors.length > 0 && (
            <Typography variant="body1" fontWeight={500}>
              <span className="font-normal">Extra Chief Editor:</span>{" "}
              {`${projectData.extraChiefEditors[0].firstName} ${projectData.extraChiefEditors[0].lastName}`}
            </Typography>
          )}
          <Typography variant="body1" fontWeight={500}>
            <span className="font-normal">Created Date:</span>{" "}
            {new Date(projectData.createdAt).toLocaleDateString('en-GB')}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            <span className="font-normal">Deadline:</span>{" "}
            {new Date(projectData.targetDate).toLocaleDateString('en-GB')}
          </Typography>
        </div>
      )}
      {activitiesList.length > 0 && (
        <div className="min-w-[112.5rem] grid grid-cols-6 gap-x-2 px-4">
          <ActivityColumn
            activityList={activitiesList.filter(
              (activity) => activity.status === "TODO"
            )}
            activityStatus="To do"
          />
          <ActivityColumn
            activityList={activitiesList.filter(
              (activity) => activity.status === "IN_PROGRESS"
            )}
            activityStatus="In Progress"
          />
          <ActivityColumn
            activityList={activitiesList.filter(
              (activity) => activity.status === "REVIEW"
            )}
            activityStatus="Review"
          />
          <ActivityColumn
              activityList={activitiesList.filter(
                  (activity) => activity.status === "REVISION"
              )}
              activityStatus="Revision"
          />
          <ActivityColumn
            activityList={activitiesList.filter(
              (activity) => activity.status === "DONE"
            )}
            activityStatus="Done"
          />
          <ActivityColumn
              activityList={activitiesList.filter(
                  (activity) => activity.status === "ARCHIVE"
              )}
              activityStatus="Archive"
          />
        </div>
      )}
    </div>
  );
};
