import { ProjectModel } from "../../model/ProjectModel";
import { UserTypeModel } from "../../model/UserTypeModel";

export interface EditModalProps {
  project: ProjectModel;
  managersList: UserTypeModel[];
  chiefEditorsList: UserTypeModel[];
  handleCloseModal: () => void;
}