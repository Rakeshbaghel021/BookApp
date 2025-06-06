import express from "express";
import Dummy from "../Models/Dummy.js";

const router = express.Router();

router.get("/dummy", async (req, res) => {
  try {
    const dummyData = await Dummy.find().sort({ createdAt: -1 });
    res.status(200).json({ data: dummyData });
  } catch (error) {
    console.error("Error fetching dummy data:", error);
    res.status(500).json({ message: "Failed to fetch dummy data" });
  }
});

export default router;
