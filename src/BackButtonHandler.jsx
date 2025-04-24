import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useNavigate, useLocation } from "react-router-dom";

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backButtonListener = App.addListener("backButton", () => {
      if (location.pathname === "/") {
        // If on the home page, exit the app
        App.exitApp();
      } else {
        // Otherwise, navigate back
        navigate(-1);
      }
    });

    return () => {
      backButtonListener.remove(); // Cleanup the listener
    };
  }, [navigate, location]);

  return null;
};

export default BackButtonHandler;