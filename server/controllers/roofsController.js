import { pool } from "../config/database.js";

// Controller for getting all roofs
const getRoofs = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roofs");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching roofs", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get roof by id
const getRoofById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM roofs WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Roof not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching roof", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getRoofs,
    getRoofById,
};
