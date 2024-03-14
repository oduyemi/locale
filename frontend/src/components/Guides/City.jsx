import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/city.css";

export const City = () => {
    const [cities, setCities] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://locale-4z2n.onrender.com/cities");
                setCities(response.data);         
            } catch (error) {
                console.error("Error fetching cities:", error);
                setFlashMessage({
                    type: "error",
                    message: "Failed to fetch cities. Please try again later.",
                });
            }
        };
    
        fetchCities();
    }, []); 

    return (
        <div className="container bg-transparent"> 
            <h2 className="mt-5 pt-5">Urban Cities</h2>  
            <div className="city-table table-responsive custom-table-responsive bg-transparent shadow">
                <table className="table custom-table">
                    <thead>
                        <tr>  
                            <th scope="col" className="text-dark">Name</th>
                            <th scope="col" className="text-dark">State</th>
                            <th scope="col" className="text-dark">Population</th>
                            <th scope="col" className="text-dark">Area</th>
                            <th scope="col" className="text-dark">Density</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(city => (
                            <tr key={city.city_id}>
                                <td className="text-warning">{city.city_name}</td>
                                <td>{city.city_state_name}</td>
                                <td className="text-warning">{city.city_population}</td>
                                <td>{city.city_area}</td>
                                <td>{city.city_density}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        </div>
    );
};
