import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Make sure the path is correct
import AddCity from "./AddCity"; // Make sure the path is correct

const CityList = () => {
    const { authToken } = useContext(AuthContext);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null); // User data state

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/me",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserData(data);
                console.log("User data:", data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Function to fetch cities
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    "https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/cities",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCities(data.cities);
            } catch (error) {
                setError("Failed to load cities: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchCities();
    }, [authToken]); // Depend on authToken

    const navigate = useNavigate();

    const handleCityClick = (cityId) => {
        navigate(`/locations/${cityId}`, { state: { cityId, authToken } });
    };

    const handleDeleteCity = async (cityId) => {
        try {
            const response = await fetch(
                `https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/city/${cityId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Remove the city from the state
            setCities(cities.filter((city) => city.id !== cityId));
        } catch (error) {
            console.error("Error deleting city:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="city-container">
            <AddCity />
            <h1 className="citiesH1">Cities</h1>
            <div className="cities">
                {cities.length > 0 ? (
                    cities.map((city) => (
                        <div className="city" key={city.id}>
                            <div
                                className="city-content"
                                onClick={() => handleCityClick(city.id)}
                            >
                                <h2>{city.name}</h2>
                                <p>{city.description}</p>
                                <img src={city.logo} alt={city.name} />
                            </div>
                            {userData && userData.role === 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCity(city.id);
                                    }}
                                    className="delete-city-btn"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No cities found.</p>
                )}
            </div>
        </div>
    );
};

export default CityList;
