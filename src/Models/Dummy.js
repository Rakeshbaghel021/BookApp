import { Schema } from "mongoose";
import mongoose from "mongoose";
//Book schema for the book collection

const dummySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Dummy = mongoose.model("Dummy", dummySchema);
export default Dummy;
