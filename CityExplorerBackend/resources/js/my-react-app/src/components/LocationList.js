import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommentList from "./CommentList";

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();
    const { cityId, authToken } = location.state || {};
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (!cityId) return;

        const fetchLocations = async () => {
            try {
                const response = await fetch(
                    `https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/locations/${cityId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        `${data.message || "Network response was not ok"}`
                    );
                }

                setLocations(data.locations);
            } catch (error) {
                setError(`Failed to load locations: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [cityId, authToken]);

    const handleLocationClick = (location) => {
        setSelectedLocation(location); // Store the entire location object
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="locations-container">
            <h1 className="locationsH1">Locations</h1>
            <div className="locations">
                {locations.length > 0 ? (
                    locations.map((location) => (
                        <div
                            className="location"
                            key={location.id}
                            onClick={() => handleLocationClick(location)}
                        >
                            <h2>{location.name}</h2>
                            <p>{location.description}</p>
                            <img src={location.image} alt={location.name} />
                        </div>
                    ))
                ) : (
                    <p>No locations found.</p>
                )}
            </div>

            {selectedLocation && (
                <div className="selectedLocation">
                    <h2 className="selectedLocationH2">
                        Comments on {selectedLocation.name}
                    </h2>{" "}
                    {/* Display the selected location's name */}
                    <CommentList
                        locationId={selectedLocation.id}
                        authToken={authToken}
                    />
                </div>
            )}
        </div>
    );
};

export default LocationList;
