import { pool } from "../config/database.js";

// Controller for getting all exteriors
const getExteriors = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM exteriors");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching exteriors", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get exterior by id
const getExteriorById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM exteriors WHERE id = $1",
            [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Exterior not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching exterior", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getExteriors,
    getExteriorById,
};
