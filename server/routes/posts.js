import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                posts.id,
                posts.title,
                posts.author,
                posts.content,
                posts.pet_friendly_rating,
                posts.created_at,
                places.id AS place_id,
                places.name AS place_name,
                places.latitude,
                places.longitude,
                categories.name AS category
            FROM posts
            JOIN places ON posts.place_id = places.id
            JOIN categories ON places.category_id = categories.id
            ORDER BY posts.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
})

export default router;