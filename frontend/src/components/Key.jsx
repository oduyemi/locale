import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "react-ionicons";






export const Key = () => {
    const [apiKey, setApiKey] = useState("");
    const [showAPI, setShowAPI] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);


    const toggleShowAPI = () => {
        setShowAPI(!showAPI)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`https://locale-4z2n.onrender.com/api-key/${apiKey}`);
            if (response.status === 200) {
                localStorage.setItem("apiKey", apiKey);
                setFlashMessage({
                    type: "success",
                    message: "Successful API key validation!",
                });
                let requestedPath = localStorage.getItem("requestedPath");
                window.location.href = requestedPath;
            } else {
                console.error("Error validating API key:", response.data);
                setFlashMessage({
                    type: "error",
                    message: "An error occurred during API key validation",
                });
            }
        } catch (error) {
            console.error("Error validating API key:", error);
            setFlashMessage({
                type: "error",
                message: "Error validating API",
            });
        }

    };
    return(
        <div className="form-group">
            <div className="row mt-5">
                <div className="col-md mt-5">
                    <div className="probootstrap-form w-50 mx-auto mt-5">
                        <h3 className="text-center text-light text-uppercase mb-2">Validate API Key</h3>
                        <form onSubmit={handleSubmit}>
                            {formSubmitted && (
                                <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                                    {flashMessage?.message}
                                </div>
                            )}
                            <div className=" mb-2 form-group position-relative">
                                <label htmlFor="pwd">Enter API key</label>
                                <div className="d-flex align-items-center">
                                <input
                                    type={showAPI ? "text" : "password"} 
                                    className="form-control bg-transparent text-light disabled placeholder"
                                    id="apiKey"
                                    placeholder="Your API Key"
                                    name="api_key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <button 
                                        type="button" 
                                        className="position-absolute end-0 px-auto mt-2 d-inline bg-success" 
                                        style={{ top: "50%", transform: "translateY(-50%)" }}
                                        onClick={toggleShowAPI}
                                    >
                                        {showAPI ? 
                                            <Eye
                                                color={"#ffffff"}
                                                height="30px"
                                                width="30px" 
                                            /> :
                                            <EyeOff 
                                                color={"#ffffff"}
                                                height="30px"
                                                width="30px"
                                            />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 mb-2 text-center">
                                <button type="submit" className="btn btn-success btn-block">Enter</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center">
                            Don't have an API key?{" "}
                            <Link to="/register" className="text-decoration-none text-warning">Sign Up</Link>{" "}
                            <span>to get one now</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
