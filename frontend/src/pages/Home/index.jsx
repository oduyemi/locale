import React, { useEffect } from "react"
import { Footer } from "../../components/Footer";
import { Banner } from "../../components/Home/Banner"


const Home = () => {
    useEffect(() => {
        document.body.classList.add("homepage");
        return () => {
          document.body.classList.remove("homepage");
        };
      }, []);
    return(
        <>
            <Banner />
            <Footer />
        </>
    )
}


export default Home