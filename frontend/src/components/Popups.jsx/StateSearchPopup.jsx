import React, { useState, useEffect } from "react";
import Modal from "react-modal";

export const StateSearchPopup = ({ open, onClose }) => {
    const [stateDetail, setStateDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null); 

    useEffect(() => {
        const storedStateDetail = JSON.parse(localStorage.getItem('stateDetail'));
        setStateDetail(storedStateDetail);
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
            }}
        >
            <p className="close text-[#EE964B]" onClick={onClose}> X </p>
            <div>
                <div position="relative" paddingTop="6.25%">
                    <div className="popup">
                        <div className="popup-content">
                            {stateDetail !== null && (
                                    <div>
                                        <h3 className="text-success"><strong>{stateDetail.state_name}</strong></h3>
                                        <p><strong>Region:</strong> {stateDetail.region_name}</p>
                                        <ul>
                                            {stateDetail.lgas.map((lga, index) => (
                                                <li key={index} style={{ listStyle:"none" }}>{lga}</li>
                                            ))}
                                        </ul>
                                        <p><strong>Cities:</strong></p>
                                        <ul>
                                            {stateDetail.cities.map((city, index) => (
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
