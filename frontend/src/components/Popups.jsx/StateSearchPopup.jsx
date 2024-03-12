import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

export const StateSearchPopup = ({ open, onClose }) => {
    const [stateDetail, setStateDetail] = useState(null);
    const [stateSearch, setStateSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/states/state/${stateSearch}`);
            setStateDetail(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setFlashMessage({
                type: "error",
                message: "Failed to fetch state details. Please try again later.",
            });
        }
    };

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
                        <div className="popup-content">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                stateDetail !== null && (
                                    <div>
                                        <h3 className="text-sucesss"><strong>{stateDetail.state_name}</strong></h3>
                                        <p><strong>Region:</strong> {stateDetail.region_name}</p>
                                        <p><strong>Local Government Areas:</strong> {stateDetail.lgas.join(", ")}</p>
                                        <p><strong>Cities:</strong> {stateDetail.cities.join(", ")}</p>
                                    </div>
                                )
                            )}
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