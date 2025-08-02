import mongoose from "mongoose";

const linkSchema=new mongoose.Schema({
    hash:String,
    userId:{ type: mongoose.Schema.ObjectId, ref: "Users", required: true ,unique:true},
})

export const Links=mongoose.model("links",linkSchema);