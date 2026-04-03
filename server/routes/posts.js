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

// Get one post
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            SELECT
                posts.id,
                posts.title,
                posts.author,
                posts.content,
                posts.pet_friendly_rating,
                posts.created_at,
                places.id AS place_id
            FROM posts
            JOIN places ON posts.place_id = places.id
            WHERE posts.id = $1
        `, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(result.rows[0]);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
})

// Add a post
router.post('/', async (req,res) => {
    const {place_name, address, latitude, longitude, 
        title, author, content, pet_friendly_rating, category_id} = req.body;
    
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const existingPlaceResult = await client.query(
            `
                SELECT *
                FROM places
                WHERE name = $1 AND address = $2
            `,
            [place_name, address]
        );

        let place;
        let createdNewPlace = false;

        if (existingPlaceResult.rows.length > 0) {
            place = existingPlaceResult.rows[0];
        } else {
            const insertPlaceResult = await client.query(
                `
                    INSERT INTO places (name, address, latitude, longitude, category_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *
                `,
                [place_name, address, latitude, longitude, category_id]
            );

            place = insertPlaceResult.rows[0];
            createdNewPlace = true;
        }

        const postResult = await client.query(
            `
                INSERT INTO posts (place_id, title, author, content, pet_friendly_rating)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `,
            [place.id, title, author, content, pet_friendly_rating]
        );

        await client.query('COMMIT');

        res.status(201).json({
            createdNewPlace,
            place,
            post: postResult.rows[0],
        });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to add post" });
    } finally {
        client.release();
    }
})

export default router;