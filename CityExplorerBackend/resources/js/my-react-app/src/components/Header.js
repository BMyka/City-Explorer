import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Log out</Link>
                    </li>
                    <li>
                        <Link to="/cities">Cities</Link>
                    </li>
                    {/* You can add more links here */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
