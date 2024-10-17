import { pool } from "../config/database.js";

// Controller for getting all wheels
const getWheels = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM wheels");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching wheels", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get wheels by id
const getWheelsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM wheels WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Wheels not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching wheels", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getWheels,
    getWheelsById,
};
