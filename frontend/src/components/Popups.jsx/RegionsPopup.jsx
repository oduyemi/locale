import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";



export const RegionsPopUp = ({ open, onClose }) => {
    const [regions, setRegions] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
          try {
              const response = await axios.get("http://localhost:8000/regions");
                  setRegions(response.data);
  
              } catch (error) {
              console.error("Error fetching regions:", error);
            }
       };
  
        fetchRegions();
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
          className:"modal",
        }}
      >
        <p className="close text-[#EE964B]" onClick={onClose}> X </p>
        <div>

            <div position="relative"  paddingTop="6.25%">
                    <div className="popup">
                        <div className="popup-content">
                            <h3 className="text-success">All Regions</h3>
                            <ul>
                                {regions && regions.map(region => (
                                    <li 
                                        key={region.region_id}
                                        style={{ listStyle: "none" }}
                                    >
                                        {region.region_id}. &emsp;
                                        <span className="text-success"><b>{region.region_name}</b></span>
                                        <br/>
                                        &emsp; &emsp;<b>States</b>: {" "} 
                                        {region.region_states && region.region_states.replace(/[{}]/g, "").split(',').map((state, index) => (
                                            <span key={index}>{state.trim()} {index < region.region_states.split(',').length - 1 ? ', ' : ''}</span>
                                    ))}
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
          </div>
        </div>
        
      </Modal>
    );
  };