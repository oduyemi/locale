import React, { useEffect } from "react";
import { ProfilePage } from "../../components/Account/ProfilePage";
import { Footer } from "../../components/Footer";






const Profile = () => {
    useEffect(() => {
        document.body.classList.add("profile");
        return () => {
          document.body.classList.remove("profile");
        };
      }, []);
    return(
        <>
            <ProfilePage />
            <Footer />
        </>
    )
}


export default Profile;