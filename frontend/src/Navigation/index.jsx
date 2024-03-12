import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../UserContext";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import CityGuide from "../pages/CityGuide";
import Profile from "../pages/Profile";
import API from "../pages/API";



const Navigation = () => {
    return(
        <>
            <UserProvider>
                <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/guide" element={<CityGuide />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/api" element={<API />} />
                        
                        
                    </Routes>
            </UserProvider>
        </>
    )
}


export default Navigation;


