import React, { useEffect } from "react"
import { Footer } from "../../components/Footer";


const Dashboard = () => {
    useEffect(() => {
        document.body.classList.add("dashboard");
        return () => {
          document.body.classList.remove("dashboard");
        };
      }, []);
    return(
        <>
        <Footer />
        </>
    )
}


export default Dashboard