import React, { useEffect } from "react";
import { City } from "../../components/Guides/City";
import { Footer } from "../../components/Footer";


const CityGuide = () => {
    useEffect(() => {
        document.body.classList.add("guide");
        return () => {
          document.body.classList.remove("guide");
        };
      }, []);
    return(
        <>
            <City />
            <Footer />
        </>
    )
}

export default CityGuide