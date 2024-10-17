import { pool } from "../config/database.js";

// Controller for getting all interiors
const getInteriors = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM interiors");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching interiors", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get interior by id
const getInteriorById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM interiors WHERE id = $1",
            [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Interior not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching interior", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getInteriors,
    getInteriorById,
};
