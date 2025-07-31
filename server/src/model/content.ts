import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link:{type:String},
  madeBy: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
});

export const Contents = mongoose.model("contents", contentSchema);
