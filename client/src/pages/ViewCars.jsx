import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCars } from "../services/cars";
import "../App.css";
import "../css/CarList.css";

const CarsComponent = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            const carsData = await fetchCars();
            setCars(carsData);
        };
        getCars();
    }, []);

    return (
        <div className="car-list-container">
            <div className="car-list">
                {cars.map((car) => (
                    <Link
                        to={`/customcars/${car.id}`}
                        key={car.id}
                        className="car"
                    >
                        <h2 className="car-title">{car.name}</h2>
                        <div className="car-grid">
                            <div className="car-item">
                                <img
                                    src="/placeholder.jpg"
                                    alt={car.exteriorid}
                                    className="car-image"
                                />
                                <p className="car-text">Exterior</p>
                            </div>
                            <div className="car-item">
                                <img
                                    src="/placeholder.jpg"
                                    alt={car.wheelsid}
                                    className="car-image"
                                />
                                <p className="car-text">Wheels</p>
                            </div>
                            <div className="car-item">
                                <img
                                    src="/placeholder.jpg"
                                    alt={car.roofid}
                                    className="car-image"
                                />
                                <p className="car-text">Roof</p>
                            </div>
                            <div className="car-item">
                                <img
                                    src="/placeholder.jpg"
                                    alt={car.interiorid}
                                    className="car-image"
                                />
                                <p className="car-text">Interior</p>
                            </div>
                        </div>
                        <p className="car-price">Price: ${car.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CarsComponent;
