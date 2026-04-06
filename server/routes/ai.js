import express from "express";
import pool from "../db/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get('/summarize/:placeId', async (req,res) => {
    const { placeId } = req.params;

    try {
        const result = await pool.query(
        `
            SELECT content FROM posts WHERE place_id = $1
        `, [placeId])
        
        // Combine all posts of a place
        const allReviews = result.rows.map(r => r.content).join("\n---\n");

        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
           You are writing a short, helpful summary for a pet-friendly place based on user reviews.

            Write 2-3 natural sentences that describe:
            - The overall atmosphere
            - How pet-friendly it is
            - What people like the most
            - Any common complaints
            - Who would enjoy this place
            - Do not makeup things not mentioned in reviews

            Make it sound like a helpful app summary (similar to Yelp).
            Avoid repeating individual reviews or listing points.

            Reviews:
            ${allReviews}
        `;

        console.log("Sending to Gemini...");

        const aiResult = await model.generateContent(prompt);
        const response = await aiResult.response;
        const text = response.text();

        res.json({ summary: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'AI is busy......Please try later' });
    }
})

export default router;