import React, { useState } from "react";
import Modal from "react-modal";
import { RegionsPopUp } from "../Popups.jsx/RegionsPopup";
import { Eye, EyeOff } from "react-ionicons";
import axios from "axios";





export const Banner = () => {
    const [regionsPopupOpen, setRegionsPopupOpen] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [data, setData] = useState(null);
    const [showAPI, setShowAPI] = useState(false);
    const [formData, setFormData] = useState({
        data: "",
        api_key: "",        
    });

    const toggleShowAPI = () => {
        setShowAPI(!showAPI)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const apiKeyValidationResponse = await axios.post(`https://locale-4z2n.onrender.com/api-key/${formData.api_key}`, null, {
            headers: { "Content-Type": "application/json" }
            });

            if (apiKeyValidationResponse.status !== 200) {
                setFlashMessage({
                    type: "error",
                    message: "Invalid API Key. Please provide a valid API Key.",
                });
                return;
            }

            let url;
            let filename;
            if (formData.data === "regions") {
                const response = await axios.get("https://locale-4z2n.onrender.com/regions");
                setData(response.data);
                filename = "regions.json";
                url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)], { type: "application/json" }));
    
            } else if (formData.data === "states") {
                const response = await axios.get("https://locale-4z2n.onrender.com/states");
                setData(response.data);
                filename = "states.json";
                url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)], { type: "application/json" }));
    
            } else if (formData.data === "lgas") {
                const response = await axios.get("https://locale-4z2n.onrender.com/lgas");
                setData(response.data);
                filename = "lgas.json";
                url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)], { type: "application/json" }));
    
            } else {
                setFlashMessage({
                    type: "error",
                    message: "Choose a valid data type",
                });
                return;
            }
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
    
            setFlashMessage({
                type: "success",
                message: "Data downloaded successfully!",
            });
    
            setFormSubmitted(true);
    
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
    }

    //  POP-UP
    const handleRegionsPopupOpen = () => {
        setRegionsPopupOpen(true);
        };
    
    const handleRegionsPopupClose = () => {
    setRegionsPopupOpen(false);
    };
    
    return (
        <section className="probootstrap-cover overflow-hidden relative hero mt-0" data-stellar-background-ratio="0.5"  id="section-home">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-md">
                <h2 className="heading mb-2 display-4 font-light">Explore Nigeria With Ease</h2>
                <p className="lead mb-5 text-sm">
                    Get to know Nigeria better.<br />
                    The current population of Nigeria is {" "}
                    <span className="text-warning">227,308,572</span><br />
                     as of February 2024, 
                    based on Worldometer elaboration <br/>
                    of the latest United Nations data<br/>
                    Click the button below to see all the regions in Nigeria.           
                </p>
                <button
                    onClick={handleRegionsPopupOpen}
                    className="btn btn-success p-3 mr-3 pl-5 pr-5 text-uppercase d-lg-inline d-md-inline d-sm-block d-block mb-3">
                        See All Regions
                </button>  
                    <Modal
                        isOpen={regionsPopupOpen}
                        onRequestClose={handleRegionsPopupClose}
                        style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                        content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            marginRight: "-50%",
                            transform: "translate(-50%, -50%)",
                            background: "white",
                        },
                        }}
                    >
                    </Modal>
            </div>
             
            <div className="col-md">
                <form onSubmit={handleSubmit} className="probootstrap-form api">
                    <h3 className="fw-light text-center text-2xl text-light mb-3 animate-pulse">Download Locale Data</h3>
                <div className="form-group mx-auto">
                    <div className="row mb-3 mx-auto">
                        {flashMessage && (
                            <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {flashMessage.message}
                            </div>
                        )}
                    <div class="col-md-12 mb-3">
                    <div class="form-group">
                        <label htmlFor="data" style={{ width: "100%"}}>Data Type
                        <select
                            className="form-control"
                            name="data"
                            style={{ width: "100%", backgroundColor:"transparent" }}
                            value={formData.data}
                            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                        >
                            <option value="" style={{ backgroundColor:"transparent"}}> - Select data -</option>
                            <option value="regions" style={{ backgroundColor:"transparent"}}>Regions</option>
                            <option value="states" style={{ backgroundColor:"transparent"}}>States</option>
                            <option value="lgas" style={{ backgroundColor:"transparent"}}>Local Government Areas</option>
                        </select>
                        </label>

                    </div>
                  </div>
                    <div className="col-md mx-auto">
                        <div className="form-group mx-auto position-relative">
                            <label htmlFor="api_key" style={{ width: "100%" }}>API key
                            <div className="d-flex align-items-center">
                                <input
                                    type={showAPI ? "text" : "password"} 
                                    name="api_key"
                                    className="form-control text-light"
                                    style={{ backgroundColor:"transparent"}}
                                    value={formData.api_key}
                                    onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
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
                            </label>
                        </div>
                    </div>
                    <div className="col-md">
                        <input type="submit" value="Download JSON File" className="btn btn-success btn-block mt-3" />
                    </div>
                    </div>
                </div>
            </form>
            </div></div></div>
            <RegionsPopUp open={regionsPopupOpen} onClose={handleRegionsPopupClose} />
        </section>
    )
}