import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Health / root route
app.get("/", (req, res) => {
 res.json({ message: "Server is running" });
});


// API routes
app.use("/api/posts", postRoutes);


// Export app for testing
export default app;


// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
 const PORT = process.env.PORT || 3000;


 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
}
