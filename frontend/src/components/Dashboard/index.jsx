import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext"
import { SearchCircleOutline } from "react-ionicons";
import axios from "axios";




export const DashboardContent = () => {
    const [regions, setRegions] = useState([]);
    const [states, setStates] = useState([])
    const [lgas, setLgas] = useState([])
    const [flashMessage, setFlashMessage] = useState(null);
    const [regionSearch, setRegionSearch] = useState('');
    const [stateSearch, setStateSearch] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
      const fetchRegions = async () => {
        try {
            const response = await axios.get("http://localhost:8000/regions");
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
  }, []);
  
  useEffect(() => {
    const fetchStates = async () => {
        try {
            const response = await axios.get("http://localhost:8000/states");
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
            const response = await axios.get("http://localhost:8000/lgas");
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

  const handleRegionSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/regions?search=${regionSearch}`);
        setRegions(response.data);
    } catch (error) {
        console.error("Error searching regions:", error);
        setFlashMessage({
            type: "error",
            message: "Failed to search regions. Please try again later.",
        });
    }
};

const handleStateSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/states?search=${stateSearch}`);
        setStates(response.data);
    } catch (error) {
        console.error("Error searching states:", error);
        setFlashMessage({
            type: "error",
            message: "Failed to search states. Please try again later.",
        });
    }
};

  return(
    <div className="container pt-5">
      <h5 className="mt-5">Hello {user && user.fname},</h5>
      <div className="row mt-5">
        <div className="col-sm-4 py-2"  >
          <div className="card card-body bg-transparent shadow">
            <div className="scroll-card card-body dashboard-main">
                <h3 className="card-title pushUp text-center">Regions</h3>
                  {flashMessage && (
                    <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                        {flashMessage.message}
                    </div>
                  )} 
                <div className="upped mx-auto">
                  <form className="probootstrap-form bg-transparent">
                    <div className="form-group mx-auto">   
                      <label for="region_search">
                      <input 
                        type="search" 
                        name="region_search" 
                        className="px-auto mx-auto" 
                        placeholder="Search Region"
                        value={regionSearch}
                        onChange={(e) => setRegionSearch(e.target.value)} 
                      />
                      <span>
                        <SearchCircleOutline
                            className="margin-auto"
                            color={"#20c997"}
                            height="32px"
                            width="32px"
                            onClick={handleRegionSearch}
                        />
                      </span>
                      </label>
                    </div>
                  </form>
                </div>
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
                {flashMessage && (
                  <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                      {flashMessage.message}
                  </div>
                )}
              <div className="upped">
                <form className="probootstrap-form bg-transparent">
                  <div className="form-group mx-auto">   
                    <label for="state_search">
                    <input 
                      type="search" 
                      name="state_search" 
                      className="px-auto mx-auto" 
                      placeholder="Search State" 
                    />
                    <span>
                      <SearchCircleOutline
                          className="margin-auto"
                          color={"#20c997"}
                          height="32px"
                          width="32px"
                          onClick=""
                      />
                    </span>
                    </label>
                  </div>
                </form>
              </div>
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
        </div>
        <div className="col-sm-4 py-2">
          <div className="card card-body bg-transparent shadow" >
            <div className="scroll-card card-body dashboard-main">
              <h3 className="card-title text-center up mb-4">Local Government Area</h3>
                {flashMessage && (
                <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                    {flashMessage.message}
                </div>
                )}
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
    </div>
    )
}