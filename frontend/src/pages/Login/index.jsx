import React, { useEffect } from "react";
import { Footer } from "../../components/Footer";
import { LoginForm } from "../../components/Login"


const Login = () => {
    useEffect(() => {
        document.body.classList.add("loginpage");
        return () => {
          document.body.classList.remove("loginpage");
        };
      }, []);
    return(
        <>
            <LoginForm />
            <Footer />
        </>
    )
}


export default Login