import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }); 


  const handleLogin = async (email, pwd) => {
    try {
      const response = await axios.post("https://locale-4z2n.onrender.com/login", { email, pwd });
  
      if (response.status === 200) {
        console.log("Success:", response.data);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setFlashMessage({
          type: "success",
          message: `Login Successful. Welcome Back ${response.data.user.fname}`,
        });
  
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else if (response.status === 400) {
        console.log("Error:", response.data);
        setFlashMessage({ type: "error", message: "All fields are required!" });
      } else {
        console.error("Error:", response.data);
        setFlashMessage({ type: "error", message: "An unexpected error occurred. Please try again later." });
      }
    } catch (error) {
      console.error("Axios Error:", error);
  
      if (error.response) {
        console.log("Response Data:", error.response.data);
        setFlashMessage({ type: "error", message: error.response.data.detail || error.response.data.message });
      } else if (error.request) {
        console.error("Request Error:", error.request);
        setFlashMessage({ type: "error", message: "No response received from the server. Please try again later." });
      }
    }
  };
  
    
    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("api_key");
      setUser(null);
      window.location.href = "/";
    };
  
    

  return (
    <UserContext.Provider value={{ user, setUser, apiKey, setApiKey, flashMessage, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}; 