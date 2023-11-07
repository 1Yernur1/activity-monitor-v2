import { getAllActivities } from "@/app/service/fetcher";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import { useContext } from "react";

export const TakeAllDataButton = () => {
  const authContext = useContext(AuthContext);
  const getData = () => {
    if (authContext?.user?.idToken) {
      getAllActivities(authContext.user.idToken)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="text-center">
      <Button variant="contained" className="bg-black" onClick={getData}>
        Get All Data
      </Button>
    </div>
  );
};
