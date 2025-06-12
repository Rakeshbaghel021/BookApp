import express from "express";
import Help from "../Models/Help.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Get dummy data in sequential order by id
router.get("/dummy", protectRoute, async (req, res) => {
  try {
    const dummyData = await Help.find().sort({ id: 1 }); // <-- Add sort by id ascending

    if (!dummyData || dummyData.length === 0) {
      return res.status(404).json({ message: "No Help data found" });
    }

    res.status(200).json({ success: true, data: dummyData });
  } catch (error) {
    console.error("Error fetching dummy data:", error);
    res.status(500).json({ message: "Server error while fetching Help data" });
  }
});

export default router;
