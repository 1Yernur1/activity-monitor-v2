import { Typography } from "@mui/material";
import { useState } from "react";
import { ActivityModel } from "../model/ActivityModel";
import { ActivityCard } from "./ActvityCard";

type ActivityColumnModel = {
  activityList: ActivityModel[];
  activityStatus: string;
}
export const ActivityColumn = ({
  activityList,
  activityStatus
}: ActivityColumnModel) => {
  return (
    <div>
      <Typography variant="h6" mb={"1rem"}>
        {activityStatus}
      </Typography>
      <div className="flex flex-col gap-4">
        {activityList.length > 0 &&
          activityList.map((activity) => (
            <ActivityCard activityData={activity} />
          ))}
      </div>
    </div>
  );
};
