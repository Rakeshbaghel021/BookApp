import express from "express";
import Dummy from "../Models/Dummy.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Get dummy data
router.get("/", protectRoute, async (req, res) => {
  try {
    const dummyData = await Dummy.find().sort({ createdAt: -1 });

    if (!dummyData || dummyData.length === 0) {
      return res.status(404).json({ message: "No New Data found" });
    }

    res.status(200).json({ success: true, data: dummyData });
  } catch (error) {
    console.error("Error fetching New data:", error);
    res.status(500).json({ message: "Server error while fetching New data" });
  }
});

export default router;
