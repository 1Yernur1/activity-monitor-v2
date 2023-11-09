import { useEffect, useState } from "react";
import { getAllActivitiesFromServer } from "../service/fetcher";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";
import { ActivityModel } from "../model/ActivityModel";
import { ActivityCard } from "./ActvityCard";
import { Container, Typography } from "@mui/material";

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
  }, [loadingActivityList]);

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
    <Container>
      <Typography variant="h6" mb={"1rem"}>
        Backlog
      </Typography>
      <div className="flex flex-col gap-4">
        {activityList.length > 0 &&
          activityList.map((activity) => (
            <ActivityCard activityData={activity} />
          ))}
      </div>
    </Container>
  );
};
