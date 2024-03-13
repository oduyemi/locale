import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

export const RegionSearchPopup = ({ open, onClose }) => {
    const [regionDetail, setRegionDetail] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null); 

    useEffect(() => {
        const storedRegionDetail = JSON.parse(localStorage.getItem('regionDetail'));
        setRegionDetail(storedRegionDetail);
    }, []);

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(66, 186, 150, 0.7)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                },
                className: "modal",
            }}
        >
            <p className="close text-[#EE964B]" onClick={onClose}> X </p>
            <div>
                <div position="relative" paddingTop="6.25%">
                    <div className="popup">
                        <div className="popup-content mt-5 pt-5">
                            {regionDetail !== null && (
                                    <div>
                                        <h3 className="text-success"><strong>{regionDetail.region_name}</strong></h3>
                                        <p><strong>State:</strong> {regionDetail.state_names}</p>
                                        <ul>
                                            {regionDetail.state_names.map((state_name, index) => (
                                                <li key={index} style={{ listStyle:"none" }}>{state_name}</li>
                                            ))}
                                        </ul>
                                        <p><strong>Cities:</strong></p>
                                        <ul>
                                            {regionDetail.cities.map((city, index) => (
                                                <li key={index} style={{ listStyle:"none" }}>{city}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }
                            {flashMessage && (
                                <div className={`flash-message ${flashMessage.type}`}>
                                    {flashMessage.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
