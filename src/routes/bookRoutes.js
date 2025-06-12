import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../Models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";
import Dummy from "../Models/Dummy.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // upload image to cloudinary

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // save it to the database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
//pagination
// get all books
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");
    const totalBooks = await Book.countDocuments();
    res.send({ books, totalBooks, totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

//get recommended books
router.get("/user", protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check if the user is the creator of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting image" });
      }
    }
    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get dummy data
router.get("/dummy", protectRoute, async (req, res) => {
  try {
    const dummyData = await Dummy.find().sort({ createdAt: -1 });

    if (!dummyData || dummyData.length === 0) {
      return res.status(404).json({ message: "No dummy data found" });
    }

    res.status(200).json({ success: true, data: dummyData });
  } catch (error) {
    console.error("Error fetching dummy data:", error);
    res.status(500).json({ message: "Server error while fetching dummy data" });
  }
});

export default router;
