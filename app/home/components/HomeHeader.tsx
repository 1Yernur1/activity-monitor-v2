import { auth } from "@/config/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const HomeHeader = ({
  setShowActivityCreateModal,
}: {
  setShowActivityCreateModal?: (isShow: boolean) => void;
}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleClickTitle = () => router.refresh();

  const handleClickSignOutBtn = () => {
    authContext?.setUser(null);
    signOut(auth).then(() => router.push("/"));
  };

  const handleClickCreateActivityModal = () => {
    if (setShowActivityCreateModal) setShowActivityCreateModal(true);
  };

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography component="button" onClick={handleClickTitle}>
          Activity Monitoring
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickCreateActivityModal}
          >
            Create Activity
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="bg-white"
            onClick={handleClickSignOutBtn}
          >
            Sign Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
