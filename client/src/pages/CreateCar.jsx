import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../services/cars";
import "../css/CreateCar.css";

const CreateCar = () => {
    const [carName, setCarName] = useState("");
    const [isConvertible, setIsConvertible] = useState(false);
    const [selectedParts, setSelectedParts] = useState({
        exterior: null,
        roof: null,
        wheels: null,
        interior: null,
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [visiblePart, setVisiblePart] = useState(null);
    const [partsData, setPartsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchPartsData = async () => {
        setLoading(true);
        try {
            const [exteriorRes, roofRes, wheelsRes, interiorRes] =
                await Promise.all([
                    fetch("/api/exteriors"),
                    fetch("/api/roofs"),
                    fetch("/api/wheels"),
                    fetch("/api/interiors"),
                ]);

            if (
                !exteriorRes.ok ||
                !roofRes.ok ||
                !wheelsRes.ok ||
                !interiorRes.ok
            ) {
                throw new Error("Network response was not ok");
            }

            const [exteriorData, roofData, wheelsData, interiorData] =
                await Promise.all([
                    exteriorRes.json(),
                    roofRes.json(),
                    wheelsRes.json(),
                    interiorRes.json(),
                ]);

            setPartsData({
                exterior: exteriorData,
                roof: roofData,
                wheels: wheelsData,
                interior: interiorData,
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartsData();
    }, []);

    useEffect(() => {
        const newTotalPrice = Object.values(selectedParts).reduce(
            (total, item) => total + (item ? Number(item.price) : 0),
            0,
        );

        const convertibleCost = isConvertible ? 5000 : 0;

        setTotalPrice(Number(newTotalPrice + convertibleCost));
    }, [selectedParts, isConvertible]);

    const handleCheckboxChange = () => {
        setIsConvertible(!isConvertible);
    };

    const handleInputChange = (event) => {
        setCarName(event.target.value);
    };

    const handlePartClick = (part) => {
        setVisiblePart(part);
    };

    const handleOptionSelect = (part, option) => {
        const updatedSelectedParts = {
            ...selectedParts,
            [part]: option,
        };

        setSelectedParts(updatedSelectedParts);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const part in selectedParts) {
            if (!selectedParts[part]) {
                alert(`Please select a(n) ${part}.`);
                return;
            }
        }

        const carData = {
            name: carName,
            isConvertible: isConvertible,
            exteriorId: selectedParts.exterior.id,
            roofId: selectedParts.roof.id,
            interiorId: selectedParts.interior.id,
            wheelsId: selectedParts.wheels.id,
            price: totalPrice,
        };

        try {
            const response = await createCar(carData);

            if (!response.ok) {
                throw new Error("Failed to submit car data");
            }

            const result = await response.json();
            console.log("Submission result:", result);

            setCarName("");
            setIsConvertible(false);
            setSelectedParts({
                exterior: null,
                roof: null,
                wheels: null,
                interior: null,
            });
            setTotalPrice(0);
            setVisiblePart(null);

            navigate("/customcars");
        } catch (error) {
            console.error("Error submitting car data:", error);
        }
    };

    return (
        <div className="car-form-container">
            <form onSubmit={handleSubmit} className="car-form">
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={isConvertible}
                        onChange={handleCheckboxChange}
                    />
                    <label>Convertible</label>
                </div>
                <div className="buttons-container">
                    {Object.keys(partsData).map((part) => (
                        <button
                            type="button"
                            key={part}
                            onClick={() => handlePartClick(part)}
                        >
                            {part.charAt(0).toUpperCase() + part.slice(1)}
                        </button>
                    ))}
                </div>
                <div>
                    <input
                        type="text"
                        value={carName}
                        onChange={handleInputChange}
                        placeholder="Enter car name"
                        required
                        className="car-name-input"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>

                <div className="total-price">Total Price: ${totalPrice}</div>
            </form>

            {loading && <div>Loading parts...</div>}
            {error && <div>Error fetching parts: {error}</div>}

            {visiblePart && (
                <div className="options-container">
                    <>
                        <h3>
                            Select{" "}
                            {visiblePart.charAt(0).toUpperCase() +
                                visiblePart.slice(1)}
                            :
                        </h3>
                        <div className="options-list">
                            {partsData[visiblePart]?.map((option) => (
                                <div key={option.name} className="option-item">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleOptionSelect(
                                                visiblePart,
                                                option,
                                            )
                                        }
                                        className="part-option"
                                    >
                                        <img
                                            src="/placeholder.jpg"
                                            className="part-image"
                                        />
                                        <span>{option.color}</span>
                                        <span>${option.price}</span>
                                    </button>
                                </div>
                            ))}

                            {!partsData[visiblePart] && (
                                <div>No options available</div>
                            )}
                        </div>
                    </>
                </div>
            )}
        </div>
    );
};

export default CreateCar;
