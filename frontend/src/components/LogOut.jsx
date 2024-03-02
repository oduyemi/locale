import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { LogOutSharp } from "react-ionicons";



export const LogOut = () => {
  const { handleLogout } = useContext(UserContext);

  return (
    <LogOutSharp
        color={"#ffffff"}
        height="20px"
        width="20px"
        onClick={handleLogout}
    />
  );
};