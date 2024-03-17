import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { PowerOutline } from "react-ionicons";



export const LogOut = () => {
  const { handleLogout } = useContext(UserContext);

  return (
    <PowerOutline
        color={"#ffffff"}
        height="20px"
        width="20px"
        onClick={handleLogout}
    />
  );
};