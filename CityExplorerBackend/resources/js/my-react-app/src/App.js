import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CityList from "./components/CityList"; // Import the CityList component
// import HomePage from './components/HomePage';
// import NotFoundPage from './components/NotFoundPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route exact path="/" element={<HomePage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/cities" element={<CityList />} />{" "}
                {/* Add this line */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
