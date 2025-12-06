import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
