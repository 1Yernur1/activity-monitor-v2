"use client";
import { useEffect, useState } from "react";
import { ActivityBoard } from "./components/ActvityBoard";
import { jwtDecode } from "jwt-decode";
import { HomeHeader } from "../home/components/HomeHeader";

export default function Page() {
  const [activitiesList, setActivitiesList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      const decodedToken = jwtDecode(token);

      fetch(
        `https://activity-monitoring-m950.onrender.com/activities/translator/${
          (decodedToken as any).user_id
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error();
        })
        .then((data) => {
          setActivitiesList(data);
        })
        .catch((err) => setActivitiesList([]));
    }
  }, []);
  return (
    <div className="h-full">
      <HomeHeader/>
      <ActivityBoard activitiesList={activitiesList} />
    </div>
  );
}
