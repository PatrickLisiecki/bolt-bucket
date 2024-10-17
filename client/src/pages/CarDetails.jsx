import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCarById, deleteCar } from "../services/cars";
import { fetchExteriorById } from "../services/exteriors";
import { fetchWheelsById } from "../services/wheels";
import { fetchRoofById } from "../services/roofs";
import { fetchInteriorById } from "../services/interiors";
import "../css/CarDetails.css";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [exterior, setExterior] = useState(null);
    const [wheels, setWheels] = useState(null);
    const [roof, setRoof] = useState(null);
    const [interior, setInterior] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCarDetails = async () => {
            try {
                const carData = await fetchCarById(id);
                setCar(carData);

                const [exteriorData, wheelsData, roofData, interiorData] =
                    await Promise.all([
                        fetchExteriorById(carData.exteriorid),
                        fetchWheelsById(carData.wheelsid),
                        fetchRoofById(carData.roofid),
                        fetchInteriorById(carData.interiorid),
                    ]);

                setExterior(exteriorData);
                setWheels(wheelsData);
                setRoof(roofData);
                setInterior(interiorData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getCarDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteCar(id);
            navigate("/cars");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = () => {
        navigate(`/edit/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="car-detail-container">
            {car ? (
                <>
                    <h1 className="car-detail-title">{car.name}</h1>
                    <img
                        src="/placeholder.jpg"
                        alt={car.name}
                        className="car-detail-image"
                    />
                    <div className="car-detail-item">
                        Exterior: {exterior?.color}
                    </div>
                    <div className="car-detail-item">
                        Wheels: {wheels?.color}
                    </div>
                    <div className="car-detail-item">Roof: {roof?.color}</div>
                    <div className="car-detail-item">
                        Interior: {interior?.color}
                    </div>
                    <div className="car-detail-item">Price: ${car.price}</div>

                    <div className="car-detail-buttons">
                        <button onClick={handleUpdate} className="update-btn">
                            Update
                        </button>
                        <button onClick={handleDelete} className="delete-btn">
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <p>Car not found.</p>
            )}
        </div>
    );
};

export default CarDetails;
