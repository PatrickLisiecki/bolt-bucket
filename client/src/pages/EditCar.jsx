import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCarById, updateCar } from "../services/cars";
import "../css/CreateCar.css";

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const fetchCarData = async () => {
        try {
            const carData = await fetchCarById(id);
            setCarName(carData.name);
            setIsConvertible(carData.isConvertible);
            setSelectedParts({
                exterior: carData.exterior,
                roof: carData.roof,
                wheels: carData.wheels,
                interior: carData.interior,
            });
            setTotalPrice(carData.price);
        } catch (err) {
            setError("Failed to fetch car data.");
        } finally {
            setLoading(false);
        }
    };

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
            setError("Error fetching parts data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarData();
        fetchPartsData();
    }, [id]);

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
        setSelectedParts({
            ...selectedParts,
            [part]: option,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const carData = {
            name: carName,
            isConvertible: isConvertible,
            exteriorId: selectedParts.exterior?.id,
            roofId: selectedParts.roof?.id,
            wheelsId: selectedParts.wheels?.id,
            interiorId: selectedParts.interior?.id,
            price: totalPrice,
        };

        try {
            const response = await updateCar(id, carData);

            console.log("Car updated successfully!");
            navigate("/customcars");
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    if (loading) return <div>Loading car data...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    Update Car
                </button>

                <div className="total-price">Total Price: ${totalPrice}</div>
            </form>

            {visiblePart && (
                <div className="options-container">
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
                                        handleOptionSelect(visiblePart, option)
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCar;
