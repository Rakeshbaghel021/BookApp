import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import dummyRoutes from "./routes/dummyRoutes.js";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
job.start(); // Start the cron job
app.use(express.json()); // to parse JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
// app.use("/api/dummy", dummyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
