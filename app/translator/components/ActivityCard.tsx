import { ActivityModel } from "@/app/home/model/ActivityModel";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useEffect, useState } from "react";
import { ActivityLanguage } from "@/app/home/statless-components/ActivityLanguage";
import { ActivityTargetLanguage } from "@/app/home/statless-components/ActivityTargetLanguage";
import { ActivityDate } from "@/app/home/statless-components/ActivityDate";
import { ActivityTranslator } from "@/app/home/statless-components/ActivityTranslator";
import { ChangeActivityStatusModal } from "./ChangeActivityStatusModal";
import { ActivityProject } from "./ActivityProject";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const [showChangeStatusActivityModal, setShowChangeStatusActivityModal] =
    useState(false);

  const handleClickHorizontalMenuIcon = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => setAnchorEl(event.currentTarget);
  const handleCloseActivityMenu = () => setAnchorEl(null);

  const handleChangeActivityStatus = () => {
    setShowChangeStatusActivityModal(true);
    handleCloseActivityMenu();
  };

  const handleCloseChangeActivityModal = () =>
    setShowChangeStatusActivityModal(false);

  return (
    <>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <div className="mb-2 flex justify-between items-center">
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>
            <IconButton onClick={handleClickHorizontalMenuIcon}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </div>
          <Menu
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleCloseActivityMenu}
          >
            <MenuItem onClick={handleChangeActivityStatus}>
              Change Status
            </MenuItem>
          </Menu>
          <div className="flex flex-col gap-1">
            <ActivityLanguage language={language} />
            <ActivityTargetLanguage targetLanguage={targetLanguage} />
            <ActivityDate description="Created Date" date={createdAt} />
            {/* <ActivityDate description="Updated Date" date={updatedAt} /> */}
            <ActivityTranslator firstName={firstName} lastName={lastName} />
            <ActivityProject projectId={projectId} />
          </div>
        </CardContent>
      </Card>
      <ChangeActivityStatusModal
        showChangeStatusActivityModal={showChangeStatusActivityModal}
        onCloseChangeActivityModal={handleCloseChangeActivityModal}
        activityStatus={activityData.status}
        activityId={activityData.id}
      />
    </>
  );
};
