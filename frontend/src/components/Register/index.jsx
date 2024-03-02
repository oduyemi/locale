import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"



export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        pwd: "",
        cpwd: ""
    });
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.pwd !== formData.cpwd) {
                throw new Error("Passwords must match!");
            }
    
            const response = await axios.post("http://localhost:8000/register", formData, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log(response.data);
    
            setFlashMessage({
                type: "success",
                message: "Registration successful. An account has been created for you.",
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
    return(
        <div className="row mt-5">
            <div className="col-md mt-3">
                <form onSubmit={handleSubmit} className="probootstrap-form w-50 mx-auto mt-5">
                    {formSubmitted && (
                        <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage?.message}
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
                                className="form-control" 
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
                                className="form-control" 
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
                                    className="form-control" 
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
                                name="pwd" className="form-control" 
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
                                className="form-control" 
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
                    <div class="text-center my-3">
                        <span class="text-success" style={{ fontSize: "smaller" }}>Already Have An Account? &nbsp; 
                            <Link class="text-danger" to="/login" style={{ textDecoration: "none" }}>Click Here</Link>
                        </span>
                    </div>
            </form></div>
        </div>
    )
}