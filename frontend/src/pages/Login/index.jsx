import React, { useEffect } from "react";
import { LoginForm } from "../../components/Login";
import { Footer } from "../../components/Footer";



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