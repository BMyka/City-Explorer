import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
    const [showForm, setShowForm] = useState(false);
    const { authToken } = useContext(AuthContext);
    const [cityName, setCityName] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Data to be sent to the API
        const cityData = {
            name: cityName,
            description: description,
            logo: logo, // In real case, this might be a URL or file path
        };

        const apiEndpoint =
            "https://floating-stream-61966-0ac3a23f6432.herokuapp.com/api/cities";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`, // Include the auth token in the request header
            },
            body: JSON.stringify(cityData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                // Reset the form and hide it
                setCityName("");
                setDescription("");
                setLogo("");
                setShowForm(false);
                navigate("/cities");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <div onClick={() => setShowForm(true)} className="add-circle">
                +
            </div>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="Enter City Name"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Description"
                    />
                    <input
                        type="text"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        placeholder="Enter Logo URL"
                    />
                    <button type="submit">Add City</button>
                </form>
            )}
        </div>
    );
};

export default AddCity;
