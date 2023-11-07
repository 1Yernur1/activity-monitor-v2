import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getAllActivitiesFromServer } from "../service/fetcher";
import { GlobalLoadingSpinner } from "@/components/GlobalLoadingSpinner";
import { ActivityModel } from "../model/ActivityModel";

export const ActivityListBoard = () => {
  const authContext = useContext(AuthContext);
  const [loadingActivityList, setLoadingActivityList] = useState(true);
  const [activityList, setActivityList] = useState<ActivityModel[]>([]);

  useEffect(() => {
    if (authContext?.user?.idToken && loadingActivityList) {
      getAllActivitiesFromServer(authContext.user.idToken)
        .then(onActivityListLoaded)
        .catch(onActivityListLoadError)
        .finally(() => setLoadingActivityList(false));
    }
  }, [loadingActivityList]);

  const onActivityListLoaded = (fetchedActivityList: ActivityModel[]) => {
    console.log(fetchedActivityList);
    setActivityList(fetchedActivityList);
  };

  const onActivityListLoadError = (error: any) => {
    console.log(error);
  };

  if (loadingActivityList) {
    return <GlobalLoadingSpinner />;
  }

  return <div>
    {activityList.map(activity => {
      return (
        activity.language
      )
    })}
  </div>;
};
