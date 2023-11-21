import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export const ProjectAddButton = () => {
  const router = useRouter();
  const handleClickAddButton = () => router.push("/projects/create");
  return (
    <div className="flex justify-end">
      <IconButton color="secondary" onClick={handleClickAddButton}>
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  );
};
