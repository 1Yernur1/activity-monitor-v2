import { getAllActivities } from "@/app/service/fetcher";
import { auth } from "@/config/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const handleClickSignOutBtn = () => {
    signOut(auth).then(() => router.push("/"));
    authContext?.setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component={"a"} className="flex-grow" href="/home">
          Activity Monitoring
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClickSignOutBtn}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
