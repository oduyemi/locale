import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { CopyOutline } from "react-ionicons";
import axios from "axios";






export const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [flashMessage, setFlashMessage] = useState(null)
    const [copied, setCopied] = useState(false);
    const [userDetails, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: ""
    });
   
    useEffect(() => {
        if (user) {
            setUserDetails({
                fname: user.fname || "",
                lname: user.lname || "",
                email: user.email || ""
            });
        }
    }, [user]);

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails) {
            setUserDetails(storedUserDetails);
        }
    }, []);

    const updateUserData = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/users/${user.id}`, {
                fname: userDetails.fname,
                lname: userDetails.lname,
                email: userDetails.email
            });

            if (response.status === 200) {
                console.log("Success:", response.data);
                setUser(response.data);
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                setFlashMessage({
                    type: "success",
                    message: "User details updated successfully!",
                  });
            } else {
                setFlashMessage({
                    type: "error",
                    message: "Failed to update user details",
                  });
            }
        } catch (error) {
            console.error("Error updating user details:", error);
            setFlashMessage({
                type: "error",
                message: "An error occurred while updating user details",
              });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

        localStorage.setItem('userDetails', JSON.stringify({
            ...userDetails,
            [name]: value
        }));
    };

    if (!user) {
        return (
            <div className="container">
                
            </div>
        );
    }

    const api_key = user ? user.api_key || "" : "";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(api_key);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };


    return(
        <div className="container rounded bg-transparent mt-5 pt-5 mb-5">
            <div className="row mx-auto mt-5 shadow">
                <div className="col-md-5 border-right mx-auto">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-right">Account Details</h3>
                        </div>
                            {flashMessage && (
                                <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {flashMessage.message}
                                </div>
                            )}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels" htmlFor="fname">First Name</label>
                                    <input 
                                        name="fname"
                                        type="text" 
                                        className="form-control" 
                                        value={userDetails.fname || user.fname}  
                                        onChange={handleChange}
                                    />
                            </div>
                            <div className="col-md-6">
                                <label className="labels" htmlFor="lname">Surname</label>
                                <input 
                                    name="lname"
                                    type="text" 
                                    className="form-control"
                                    value={userDetails.lname || user.lname} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels" htmlFor="email">Email Address</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="form-control" 
                                    value={userDetails.email || user.email}
                                    onChange={handleChange} 
                                />
                            </div> 
                        </div> 
                      
                        <div className="mt-5 text-center">
                            <button 
                                className="btn btn-success profile-button" 
                                onClick={updateUserData}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5 mx-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <span><h3>API Key</h3></span>
                                <span>
                                    <button className="btn btn-outline-light px-3 p-1">Show/Hide</button>
                                </span>
                        </div> 
                        <br />
                        <div className="col-md-12">
                            <p className="my-3">
                                {api_key.substring(0, 4) + "*****" + api_key.substring(api_key.length -3)}
                                &emsp; 
                                <span onClick={copyToClipboard} style={{ cursor: "pointer" }}>
                                    <CopyOutline
                                        color={"#ffffff"}
                                        height="20px"
                                        width="20px"
                                    />
                                </span>
                            </p>
                            {copied && <p className="text-light">Copied!</p>}
                        </div> 
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}