import { auth } from "@/config/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const HomeHeader = ({
  setShowActivityCreateModal,
}: {
  setShowActivityCreateModal?: (isShow: boolean) => void;
}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole((decodedToken as any).custom_claims[0]);
    }
  }, []);
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
        <Typography
          component="button"
          onClick={handleClickTitle}
          fontSize={20}
          fontWeight={900}
        >
          Activity Monitoring
        </Typography>
        <div className="flex gap-2">
          {role === "PROJECT_MANAGER" && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClickCreateActivityModal}
            >
              Create Activity
            </Button>
          )}

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
