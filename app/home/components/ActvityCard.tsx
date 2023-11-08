import { Card, CardContent, Chip, Typography } from "@mui/material";
import { ActivityModel } from "../model/ActivityModel";
import { AccessAlarmOutlined } from "@mui/icons-material";
import { getFormattedDate } from "../service/formatter";
import { ActivityLanguage } from "../statless-components/ActivityLanguage";
import { ActivityTargetLanguage } from "../statless-components/ActivityTargetLanguage";
import { ActivityDate } from "../statless-components/ActivityDate";
import { ActivityTranslator } from "../statless-components/ActivityTranslator";

export const ActivityCard = ({
  activityData,
}: {
  activityData: ActivityModel;
}) => {
  const {
    projectId,
    projectName,
    title,
    language,
    targetLanguage,
    translator,
    status,
    createdAt,
    updatedAt,
  } = activityData;

  const { id, role, firstName, lastName } = translator;

  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <div className="flex flex-col gap-1">
          <ActivityLanguage language={language} />
          <ActivityTargetLanguage targetLanguage={targetLanguage} />
          <ActivityDate description="Created Date" date={createdAt} />
          <ActivityDate description="Updated Date" date={updatedAt} />
          <ActivityTranslator firstName={firstName} lastName={lastName} />
        </div>
      </CardContent>
    </Card>
  );
};
