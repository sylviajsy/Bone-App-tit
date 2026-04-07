import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// Get all places
router.get('/', async (req, res) => {
    try{
        const result = await pool.query(`
            SELECT
                places.id,
                places.name,
                places.address,
                places.latitude,
                places.longitude,
                categories.name AS category
            FROM places
            JOIN categories ON places.category_id = categories.id
            ORDER BY places.name;
        `);
        
        res.json(result.rows);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch places' });
    }
})

export default router;