import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ActivityModel } from "../model/ActivityModel";
import { ActivityLanguage } from "../statless-components/ActivityLanguage";
import { ActivityTargetLanguage } from "../statless-components/ActivityTargetLanguage";
import { ActivityDate } from "../statless-components/ActivityDate";
import { ActivityTranslator } from "../statless-components/ActivityTranslator";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import { ActivityEditModal } from "./ActivityEditModal";
import { ChangeActivityStatusModal } from "./ChangeActivityStatusModal";
import {jwtDecode} from "jwt-decode";

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

  const [showActivityEditModal, setShowActivityEditModal] = useState(false);
  const [showChangeStatusActivityModal, setShowChangeStatusActivityModal] =
    useState(false);

  const handleClickHorizontalMenuIcon = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => setAnchorEl(event.currentTarget);
  const handleCloseActivityMenu = () => setAnchorEl(null);

  const handleClickEditActivity = () => {
    setShowActivityEditModal(true);
    handleCloseActivityMenu();
  };
  const handleCloseEditActivityModal = () => setShowActivityEditModal(false);

  const handleChangeActivityStatus = () => {
    setShowChangeStatusActivityModal(true);
    handleCloseActivityMenu();
  };

  const handleCloseChangeActivityModal = () =>
    setShowChangeStatusActivityModal(false);

  const userRole = jwtDecode(localStorage.getItem("idToken") || "")


  if ((userRole as any).custom_claims[0] == "PROJECT_MANAGER" &&
      status === "TODO" || status === "IN_PROGRESS") {
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
                <MenuItem onClick={handleClickEditActivity}>
                  Edit
                </MenuItem>
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
              </div>
            </CardContent>
          </Card>
          <ActivityEditModal
              isOpenModal={showActivityEditModal}
              onCloseActivityModal={handleCloseEditActivityModal}
              activity={activityData}
          />
          <ChangeActivityStatusModal
              showChangeStatusActivityModal={showChangeStatusActivityModal}
              onCloseChangeActivityModal={handleCloseChangeActivityModal}
              activityStatus={activityData.status}
              activityId={activityData.id}
          />
        </>
    );
  } else if ((userRole as any).custom_claims[0] == "PROJECT_MANAGER" &&
      status != "TODO" || status != "IN_PROGRESS") {
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
                <MenuItem onClick={handleClickEditActivity}>
                  Edit
                </MenuItem>
              </Menu>
              <div className="flex flex-col gap-1">
                <ActivityLanguage language={language} />
                <ActivityTargetLanguage targetLanguage={targetLanguage} />
                <ActivityDate description="Created Date" date={createdAt} />
                {/* <ActivityDate description="Updated Date" date={updatedAt} /> */}
                <ActivityTranslator firstName={firstName} lastName={lastName} />
              </div>
            </CardContent>
          </Card>
          <ActivityEditModal
              isOpenModal={showActivityEditModal}
              onCloseActivityModal={handleCloseEditActivityModal}
              activity={activityData}
          />
          <ChangeActivityStatusModal
              showChangeStatusActivityModal={showChangeStatusActivityModal}
              onCloseChangeActivityModal={handleCloseChangeActivityModal}
              activityStatus={activityData.status}
              activityId={activityData.id}
          />
        </>
    );
  }
};
