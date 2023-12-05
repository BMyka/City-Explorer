import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CityList = () => {
    const location = useLocation();
    const authToken = location.state?.authToken;

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/cities",
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

        fetchCities();
    }, [authToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {cities.length > 0 ? (
                cities.map((city) => (
                    <div
                        key={city.id}
                        style={{
                            margin: "10px",
                            border: "1px solid #ccc",
                            padding: "10px",
                        }}
                    >
                        <h2>{city.name}</h2>
                        <p>{city.description}</p>
                        <img
                            src={city.logo}
                            alt={city.name}
                            style={{ width: "100px", height: "100px" }}
                        />
                    </div>
                ))
            ) : (
                <p>No cities found.</p>
            )}
        </div>
    );
};

export default CityList;
