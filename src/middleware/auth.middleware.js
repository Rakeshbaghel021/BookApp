import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// const response = await fetch(`https://localhost:3000/api/books`, {
//   method: "POST",
//   body: JSON.stringify({
//     title,
//     caption,
//   }),
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

const protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    // verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Token is not Valid" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token is not Valid" });
  }
};

export default protectRoute;
