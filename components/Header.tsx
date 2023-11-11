import { auth } from "@/config/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

export const Header = ({
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
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography component="button" onClick={handleClickTitle} fontSize={20} fontWeight={900}>
          Activity Monitoring
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
