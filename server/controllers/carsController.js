import { pool } from "../config/database.js";

// Get all cars
const getCars = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cars");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching cars", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get car by id
const getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cars WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching car", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new car
const createCar = async (req, res) => {
    const {
        name,
        isConvertible,
        exteriorId,
        roofId,
        wheelsId,
        interiorId,
        price,
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO cars (name, isConvertible, exteriorId, roofId, wheelsId, interiorId, price) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                name,
                isConvertible,
                exteriorId,
                roofId,
                wheelsId,
                interiorId,
                price,
            ],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating car", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing car
const updateCar = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        isConvertible,
        exteriorId,
        roofId,
        wheelsId,
        interiorId,
        price,
    } = req.body;
    try {
        const result = await pool.query(
            `UPDATE cars SET name = $1, isConvertible = $2, exteriorId = $3, roofId = $4, wheelsId = $5, 
            interiorId = $6, price = $7 WHERE id = $8 RETURNING *`,
            [
                name,
                isConvertible,
                exteriorId,
                roofId,
                wheelsId,
                interiorId,
                price,
                id,
            ],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error updating car", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM cars WHERE id = $1 RETURNING *",
            [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        console.error("Error deleting car", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
