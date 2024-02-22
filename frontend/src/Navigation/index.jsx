import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import CityGuide from "../pages/CityGuide";



const Navigation = () => {
    return(
        <>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/guide" element={<CityGuide />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    
                    
                </Routes>
        </>
    )
}


export default Navigation;


