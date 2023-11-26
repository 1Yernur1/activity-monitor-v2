import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export const ProjectInfoModal = ({
  isOpenProjectModal,
  projectData,
  onCloseProjectModal,
}: {
  isOpenProjectModal: boolean;
  projectData: any;
  onCloseProjectModal: () => void;
}) => {
  return (
    <Dialog open={isOpenProjectModal} onClose={onCloseProjectModal} fullWidth>
      <DialogTitle>Project Info</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Typography variant="body1">Name</Typography>
            <Typography variant="body1" fontWeight={500}>
              {projectData.name}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body1">Chief Editor</Typography>
            <Typography variant="body1" fontWeight={500}>
              {`${projectData.chiefEditor.firstName} ${projectData.chiefEditor.lastName}`}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body1">Manager</Typography>
            <Typography variant="body1" fontWeight={500}>
              {`${projectData.manager.firstName} ${projectData.manager.lastName}`}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body1">Created date of the project</Typography>
            <Typography variant="body1" fontWeight={500}>
              {new Date(projectData.createdAt).toLocaleDateString('en-GB')}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body1">Deadline of the project</Typography>
            <Typography variant="body1" fontWeight={500}>
              {new Date(projectData.targetDate).toLocaleDateString('en-GB')}
            </Typography>
          </div>
          {projectData.extraChiefEditors.length > 0 && (
            <div className="flex justify-between items-center">
              <Typography variant="body1">Extra Chief Editor</Typography>
              <Typography variant="body1" fontWeight={500}>
                {`${projectData.extraChiefEditors[0].firstName} ${projectData.extraChiefEditors[0].lastName}`}
              </Typography>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
