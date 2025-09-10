import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../services/userServices";

function ClearSessionWhenLeavingProfile() {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const prevPath = sessionStorage.getItem("prevPath");

      if (prevPath === "/profile" && location.pathname !== "/profile") {
        sessionStorage.clear();
        await logoutUser();
      }

      sessionStorage.setItem("prevPath", location.pathname);
    })();
  }, [location]);

  return null;
}

export default ClearSessionWhenLeavingProfile;