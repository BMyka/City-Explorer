import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import CityList from "./components/CityList";
import LocationList from "./components/LocationList";
import Footer from "./components/Footer";
import HeaderWrapper from "./components/HeaderWrapper";

import { AuthProvider } from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <HeaderWrapper />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cities" element={<CityList />} />
                    <Route path="/locations/:id" element={<LocationList />} />
                    {/* Other routes */}
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}
export default App;
