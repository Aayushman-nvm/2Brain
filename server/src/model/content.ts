import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link:{type:String},
  type:{type:String,enum:["Image","Video","Tweet","WebSite","Miscellaneous"]},
  madeBy: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
  //tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
});

export const Contents = mongoose.model("contents", contentSchema);
