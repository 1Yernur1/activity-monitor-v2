import { ActivityColumn } from "./ActivityColumn";

export const ActivityBoard = ({
  activitiesList,
}: {
  activitiesList: any[];
}) => {
  return (
    <div className="h-full pt-20 grid grid-cols-6">
      <div className="overflow-auto h-full col-start-1 col-span-full">
        {/* <div className="px-4 mb-2 pt-2">
        
      </div> */}
        <div className="min-w-[131.25rem] grid grid-cols-7 gap-x-2 px-4">
          <ActivityColumn
            activityList={activitiesList.filter(
              (activity) => activity.status === "NEW"
            )}
            activityStatus="Backlog"
          />
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
              (activity) => activity.status === "IN_PROGRESS_FROM_REVIEW"
            )}
            activityStatus="In progress from review"
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
            activityStatus={"Archive"}
          />
        </div>
      </div>
    </div>
  );
};
