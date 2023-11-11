import { useEffect, useState } from "react";
import { getAllActivitiesFromServer } from "../service/fetcher";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";
import { ActivityModel } from "../model/ActivityModel";
import { ActivityColumn } from "./ActivityColumn";
import { Typography } from "@mui/material";

export const ActivityListBoard = () => {
  const [loadingActivityList, setLoadingActivityList] = useState(true);
  const [activityList, setActivityList] = useState<ActivityModel[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token && loadingActivityList) {
      getAllActivitiesFromServer(token)
        .then(onActivityListLoaded)
        .catch(onActivityListLoadError)
        .finally(() => setLoadingActivityList(false));
    }
  }, [loadingActivityList, activityList]);

  const onActivityListLoaded = (fetchedActivityList: ActivityModel[]) => {
    setActivityList(fetchedActivityList);
  };

  const onActivityListLoadError = (error: any) => {
    console.log(error);
  };

  if (loadingActivityList) {
    return <GlobalLoadingSpinner />;
  }

  return (
    <div className="overflow-auto h-full col-start-2 col-span-full">
      <Typography variant="h5" fontWeight={700} px={2} mb={1}>
        {activityList.length > 0 && activityList[0].projectName}
      </Typography>
      {activityList.length > 0 && (
        <div className="min-w-[112.5rem] grid grid-cols-6 gap-x-2 px-4">
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "NEW"
            )}
            activityStatus="Backlog"
          />
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "TODO"
            )}
            activityStatus="To do"
          />
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "IN_PROGRESS"
            )}
            activityStatus="In Progress"
          />
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "IN_PROGRESS_FROM_REVIEW"
            )}
            activityStatus="In progress from review"
          />
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "REVIEW"
            )}
            activityStatus="Review"
          />
          <ActivityColumn
            activityList={activityList.filter(
              (activity) => activity.status === "DONE"
            )}
            activityStatus="Done"
          />
        </div>
      )}
    </div>
  );
};
