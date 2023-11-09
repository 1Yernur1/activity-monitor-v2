import { Dialog, DialogTitle } from "@mui/material";
import { ActivityModel } from "../model/ActivityModel";

export const ActivityEditModal = ({
  isOpenModal,
  activity,
  onCloseActivityModal,
}: {
  isOpenModal: boolean;
  activity: ActivityModel;
  onCloseActivityModal: () => void;
}) => {
  return (
    <Dialog open={isOpenModal} onClose={onCloseActivityModal}>
      <DialogTitle>Edit Activity</DialogTitle>
    </Dialog>
  );
};
