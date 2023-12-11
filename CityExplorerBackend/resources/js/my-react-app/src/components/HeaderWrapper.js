import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const HeaderWrapper = () => {
    const location = useLocation();

    if (location.pathname === "/login") {
        return null;
    }

    return <Header />;
};

export default HeaderWrapper;
