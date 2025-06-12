import { Schema } from "mongoose";
import mongoose from "mongoose";
//Book schema for the book collection

const dummySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Help = mongoose.model("Help", dummySchema);
export default Help;
