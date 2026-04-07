import express from "express";

const router = express.Router();

router.get('/autocomplete', async (req,res) => {
    try {
        const { text } = req.query;

        if (!text) {
            return res.status(400).json({ error:'Text is required'});
        }

        const url = `https://api.geoapify.com/v1/geocode/autocomplete` +
                    `?text=${encodeURIComponent(text)}` +
                    `&type=amenity` +
                    `&bias=proximity:-119.4179,36.7783`+
                    `&limit=5` +
                    `&format=json` +
                    `&apiKey=${process.env.GEOAPIFY_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data?.message || 'Failed to fetch autocomplete results',
            });
        }

        const results = (data.results || []).map((item) => ({
            name: item.name || '',
            address: item.formatted || '',
            lat: item.lat,
            lon: item.lon,
            city: item.city || '',
            state: item.state || '',
            country: item.country || '',
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch autocomplete results' });
    }
})

export default router;