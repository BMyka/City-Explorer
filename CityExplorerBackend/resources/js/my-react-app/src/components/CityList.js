import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

        fetchCities();
    }, [authToken]);

    const navigate = useNavigate();

    const handleCityClick = (cityId) => {
        navigate(`/locations/${cityId}`, { state: { cityId, authToken } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="citie-container">
            <h1 className="citiesH1">Cities</h1>
            <div className="cities">
                {cities.length > 0 ? (
                    cities.map((city) => (
                        <div
                            className="city"
                            key={city.id}
                            style={{}}
                            onClick={() => handleCityClick(city.id)}
                        >
                            <h2>{city.name}</h2>
                            <p>{city.description}</p>
                            <img src={city.logo} alt={city.name} />
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
