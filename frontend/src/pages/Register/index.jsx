import React, { useEffect } from "react"
import { Footer } from "../../components/Footer";
import { RegisterForm } from "../../components/Register"


const Register = () => {
    useEffect(() => {
        document.body.classList.add("registerpage");
        return () => {
          document.body.classList.remove("registerpage");
        };
      }, []);
    return(
        <>
            <RegisterForm />
            <Footer />
        </>
    )
}


export default Register