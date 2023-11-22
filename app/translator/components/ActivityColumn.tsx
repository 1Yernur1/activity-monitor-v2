import Typography from "@mui/material/Typography/Typography";
import { ActivityCard } from "./ActivityCard";

export const ActivityColumn = ({ activityList, activityStatus }: any) => {
  return (
    <div>
      <Typography variant="h6" mb={"1rem"}>
        {activityStatus}
      </Typography>
      <div className="flex flex-col gap-4">
        {activityList.length > 0 &&
          activityList.map((activity: any) => (
            <ActivityCard activityData={activity} key={activity.id} />
          ))}
      </div>
    </div>
  );
};
