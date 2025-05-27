import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Database Connected successfully`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
