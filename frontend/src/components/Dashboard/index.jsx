import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext"
import { SearchCircleOutline } from "react-ionicons";
import Modal from "react-modal";
import { RegionSearchPopup } from "../Popups.jsx/RegionSearchPopup";
import { StateSearchPopup } from "../Popups.jsx/StateSearchPopup";
import axios from "axios";



export const DashboardContent = () => {
    const { user } = useContext(UserContext);
    const [regions, setRegions] = useState([]);
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [regionPopupOpen, setRegionPopupOpen] = useState(false);
    const [regionSearch, setRegionSearch] = useState("");
    const [statePopupOpen, setStatePopupOpen] = useState(false);
    const [stateSearch, setStateSearch] = useState("");
    const [stateDetail, setStateDetail] = useState(null); 
    const [regionDetail, setRegionDetail] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);    
    
    

    useEffect(() => {
      if (!user) {
        setFlashMessage({
          type: "error",
          message: "You need to validate your API key first!",
        });
        localStorage.setItem("requestedPath", "/dashboard");
        window.location.href = "/api";
      } else {
      const fetchRegions = async () => {
        try {
            const response = await axios.get("https://locale-4z2n.onrender.com/regions");
                setRegions(response.data);

            } catch (error) {
            console.error("Error fetching regions:", error);

            setFlashMessage({
                type: "error",
                message: "Failed to fetch regions. Please try again later.",
            });
          }
        };
          fetchRegions();
        }
      }, [user]);
  
      useEffect(() => {
        const fetchStates = async () => {
        try {
            const response = await axios.get("https://locale-4z2n.onrender.com/states");
                setStates(response.data);         

        } catch (error) {
            console.error("Error fetching states:", error);

            setFlashMessage({
                type: "error",
                message: "Failed to fetch states. Please try again later.",
            });
          }
        };
          fetchStates();
        }, []); 

        useEffect(() => {
          const fetchLgas = async () => {
          try {
            const response = await axios.get("https://locale-4z2n.onrender.com/lgas");
                setLgas(response.data);         

          } catch (error) {
            console.error("Error fetching local government areas:", error);
            setFlashMessage({
                type: "error",
                message: "Failed to fetch local government areas. Please try again later.",
              });
            }
          };
            fetchLgas();
          }, []); 

              //  POP-UP
          const handleRegionSearch = () => {
            setRegionPopupOpen(true);
          };

          const handleRegionPopupClose = () => {
            setRegionPopupOpen(false);
          };


          const handleStateSearch = () => {
            setStatePopupOpen(true);
          };

          const handleStatePopupClose = () => {
            setStatePopupOpen(false);
          };

          const handleSearchState = async () => {
            if (stateSearch.trim() === "") {
                setFlashMessage({
                    type: "error",
                    message: "Please enter a state name.",
                });
                return;
            }
    
            try {
              const response = await axios.get(`https://locale-4z2n.onrender.com/states/state/${encodeURIComponent(stateSearch)}`);
              localStorage.setItem('stateDetail', JSON.stringify(response.data));
              setStateDetail(response.data);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setFlashMessage({
                  type: "error",
                  message: "Failed to fetch state details. Please try again later.",
              });
          }   
        }
          const handleSearchRegion = async () => {
            if (regionSearch.trim() === "") {
                setFlashMessage({
                    type: "error",
                    message: "Please enter a region name.",
                });
                return;
            }
    
            try {
              const response = await axios.get(`https://locale-4z2n.onrender.com/regions/region/${encodeURIComponent(regionSearch)}`);
              localStorage.setItem('regionDetail', JSON.stringify(response.data));
              setRegionDetail(response.data);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setFlashMessage({
                  type: "error",
                  message: "Failed to fetch region details. Please try again later.",
              });  
            }
        };
    

  return(
    <div className="container pt-5">
      <h5 className="mt-5">Hello {user && user.fname},</h5>
        {flashMessage && (
          <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
              {flashMessage.message}
          </div>
          )}
      <div className="row mt-5">
        <div className="col-sm-4 py-2"  >
          <div className="card card-body bg-transparent shadow">
            <div className="scroll-card card-body dashboard-main">
                <h3 className="card-title pushUp text-center">Regions</h3>
                {/* <div className="upped mx-auto">
                  <form className="probootstrap-form bg-transparent">
                    <div className="form-group mx-auto">   
                      <label htmlFor="region_name">
                      <input 
                        type="search" 
                        name="region_name" 
                        className="px-auto mx-auto" 
                        placeholder="Search Region"
                        value={regionSearch}
                        onChange={(e) => setRegionSearch(e.target.value)}
                      />
                        <span>
                          <button>
                          <SearchCircleOutline
                            className="margin-auto"
                            color={"#20c997"}
                            height="32px"
                            width="32px"
                            onClick={handleRegionSearch}
                          />
                          </button>
                        </span>
                      </label>
                    </div>
                  </form>
                </div> */}
                <div className="upper"> 
                  {regions.map(region => (
                    <p key={region.id} className="card-text">
                      {region.region_id} &emsp; {region.region_name}
                    </p>
                  ))}               
                </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 py-2">
          <div className="card text-white bg-transparent shadow">
            <div className="scroll-card card-body dashboard-maine">
              <h3 className="card-title text-center">States</h3>
              {/* <div className="upped">
              <form className="probootstrap-form bg-transparent">
                <div className="form-group mx-auto">
                  <label htmlFor="stateSearch">
                    <input
                        type="search"
                        name="stateSearch"
                        placeholder="Search State"
                        className="px-auto mx-auto"
                        value={stateSearch}
                        onChange={(e) => setStateSearch(e.target.value)}
                    />
                    <span>
                      <button className="">
                        <SearchCircleOutline
                            className="margin-auto"
                            color={"#20c997"}
                            height="32px"
                            width="32px"
                            onClick={handleStateSearch}
                          />
                      </button>
                    </span>
                  </label>
                </div>
            </form>
        </div> */}
        <div className="upper">
            {states.map((state) => (
                <div className="row" key={state.id}>
                    <div className="col">
                        <p className="card-text">
                            {state.state_id}. &emsp; State: {state.state_name}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text">
                            Capital: {state.state_capital}
                        </p>
                    </div>
                </div>
            ))}
                            </div>  
                        </div>
                    </div>
                    <StateSearchPopup open={statePopupOpen} onClose={handleStatePopupClose} />
        </div>
        <div className="col-sm-4 py-2">
          <div className="card card-body bg-transparent shadow" >
            <div className="scroll-card card-body dashboard-main">
              <h3 className="card-title text-center up mb-4">Local Government Area</h3>
                {lgas.map(lga => (
                  <div key={lga.lga_id}>
                      <p className="card-text">
                        {lga.lga_id}. &emsp; {lga.lga_name}
                      </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <RegionSearchPopup open={regionPopupOpen} onClose={handleRegionPopupClose} />
      </div>
    )
}