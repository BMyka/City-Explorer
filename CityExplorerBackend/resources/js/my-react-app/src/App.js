import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CityList from "./components/CityList";
import LocationList from "./components/LocationList";
// import NotFoundPage from './components/NotFoundPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cities" element={<CityList />} />{" "}
                <Route path="/locations/:id" element={<LocationList />} />
                {/* Add this line */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
