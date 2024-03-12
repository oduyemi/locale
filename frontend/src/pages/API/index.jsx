import React, { useEffect } from "react";
import { Key } from "../../components/Key";
import { Footer } from "../../components/Footer";


const API = () => {
    useEffect(() => {
        document.body.classList.add("key");
        return () => {
          document.body.classList.remove("key");
        };
      }, []);
    return(
        <>
            <Key />
            <Footer />
        </>
    )
}

export default API