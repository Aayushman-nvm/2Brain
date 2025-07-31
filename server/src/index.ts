import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { router } from "./router/serverRoutes";

dotenv.config();
const app = express();

const port: number = 5000;

app.use(express.json());
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello");
});

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(mongoURI).then(() => {
  app.listen(port, () => {
    console.log("Server listening on: http://localhost:5000");
    console.log("URI: ", process.env.MONGO_URI);
  });
});
