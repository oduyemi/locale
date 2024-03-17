import React, { useState } from "react";
import { CopyOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import axios from "axios"



export const RegisterForm = () => {
    const [apiKey, setApiKey] = useState(""); 
    const [copied, setCopied] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        pwd: "",
        cpwd: ""
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.pwd !== formData.cpwd) {
                throw new Error("Passwords must match!");
            }
    
            const response = await axios.post("https://locale-4z2n.onrender.com/register", formData, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log(response.data);
    
            setApiKey(response.data.api_key); 

            setFlashMessage({
                type: "success",
                message: "Registration successful! An account has been created for you. Copy your API key below.",
            });

            setFormSubmitted(true);
    
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
    
        } catch (error) {
            console.error("Error:", error);
    
            let errorMessage;
            if (error.response) {
                console.log("Response Data:", error.response.data);
                errorMessage = error.response.data.detail || error.response.data.message;
            } else {
                console.error("Request Error:", error.request);
                errorMessage = "No response received from the server. Please try again later.";
            }
    
            setFlashMessage({ type: "error", message: errorMessage });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
    };

    return(
        <div className="row mt-5">
            <div className="col-md mt-3">
                <form onSubmit={handleSubmit} className="probootstrap-form w-50 mx-auto mt-5">
                    {formSubmitted && (
                        <div>
                            <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {flashMessage?.message}
                            </div>
                            {apiKey && (
                                <div className="mx-auto mb-5">
                                    <h4 className="text-3xl fw-bold mb-3">
                                        API Key
                                    </h4>
                                    <p className="my-3">
                                        {apiKey}
                                        &emsp;
                                        <span onClick={copyToClipboard} style={{ cursor: "pointer" }}>
                                            <CopyOutline
                                                color={"#023047"}
                                                height="20px"
                                                width="20px"
                                            />
                                        </span>
                                    </p>
                                    {copied && <p className="text-warning">Copied!</p>}
                                </div>
                            )}
                        </div>
                    )}
                <h2 className="text-center display-5 text-success mt-2">Registration</h2>
                <div className="form-group">
                    <div className="row mb-3">
                    <div className="col-md">
                        <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <div className="">
                            <input 
                                type="text" 
                                name="fname" 
                                className="form-control bg-transparent text-light disabled placeholder" 
                                placeholder="Your First Name" 
                                value={formData.fname} 
                                onChange={handleChange} 
                            />
                        </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <div className=""> 
                            <input 
                                type="text" 
                                name="lname" 
                                className="form-control bg-transparent text-light disabled placeholder" 
                                placeholder="Your Last Name"
                                value={formData.lname} 
                                onChange={handleChange}
                             />
                        </div>
                        </div>
                    </div>
                </div>
                    </div>

                    <div className="col-md">
                        <div className="form-group">
                        <div className="">
                        <label htmlFor="email" style={{ width: "100%" }}>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control bg-transparent text-light disabled placeholder" 
                                    placeholder="Your Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        </div>
                    </div>
            
                    <div className="row mb-5">
                    <div className="col-md">
                        <div className="form-group">
                        <label htmlFor="pwd">Create Password</label>
                        <div className="">
                            <input 
                                type="password" 
                                name="pwd"
                                className="form-control bg-transparent text-light disabled placeholder" 
                                placeholder="Create Your Password" 
                                value={formData.pwd}
                                onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <label htmlFor="cpwd">Confirm Password</label>
                        <div className="">
                            <input 
                                type="password" 
                                name="cpwd" 
                                className="form-control bg-transparent text-light disabled placeholder" 
                                placeholder="Confirm The Password"
                                value={formData.cpwd}
                                onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>
                </div>
                    <div className="col-md text-center">
                        <input type="submit" value="Register" className="btn btn-success btn-block" />
                    </div>
                    <div className="text-center my-3">
                        <span className="text-light" style={{ fontSize: "smaller" }}>Already Have An Account? &nbsp; 
                            <Link className="text-warning" to="/login" style={{ textDecoration: "none" }}>Click Here</Link>
                        </span>
                    </div>
            </form></div>
        </div>
    )
}