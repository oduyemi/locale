import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";



export const LoginForm = () => {
    const { handleLogin, flashMessage } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        pwd: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); 
        handleLogin(formData.email, formData.pwd)
    };

    console.log("flashMessage:", flashMessage); 

    return(
        <div className="row mt-5">
            <div className="col-md mt-5">
                <form onSubmit={handleSubmit} className="probootstrap-form w-50 mx-auto mt-5">
                <h2 className="text-center display-5 text-success mt-2">Login</h2>
                    {formSubmitted && flashMessage && (
                        <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage.message}
                        </div>
                    )}
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-md">
                            <div className="form-group">
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
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <div className="">
                            <label htmlFor="pwd" style={{ width: "100%" }}>
                                <input 
                                    type="password" 
                                    name="pwd" 
                                    className="form-control" 
                                    placeholder="Your Password" 
                                    value={formData.pwd}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        </div>
                    </div>
            
                    <div className="row mb-5">
                    
                </div>
                    <div className="col-md text-center">
                        <input type="submit" value="Login" className="btn btn-success btn-block" />
                    </div>
                    <div class="text-center my-3">
                        <span class="text-success" style={{ fontSize: "smaller"}}>Don't have an account yet? &nbsp;
                            <Link class="text-danger" to="/register" style={{ textDecoration: "none" }}>Click Here</Link>
                        </span>
                    </div>
            </form></div>
        </div>
    )
}