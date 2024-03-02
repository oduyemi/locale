import React, { useEffect } from "react"
import { DashboardContent } from "../../components/Dashboard";
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
        <DashboardContent />
        <Footer />
        </>
    )
}


export default Dashboard