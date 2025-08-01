import { Request, Response } from "express";
import mongoose from "mongoose";
import { Contents } from "../model/content";

interface Content {
  title: string;
  type: string;
  madeBy: mongoose.Types.ObjectId;
  link: string;
  tags: string[];
}

export async function handleContents(req: Request, res: Response) {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const newContent: Content = {
      title: body.title,
      type: body.type,
      madeBy: new mongoose.Types.ObjectId(body.userID),
      link: body.link,
      tags: body.tags,
    };

    const savedContent = await Contents.create(newContent);
    return res.status(201).json(savedContent);
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getContents(req: Request, res: Response) {
  try {
    const body = req.body

    if (!body?.id) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const userId = new mongoose.Types.ObjectId(body.id);

    const allContent = await Contents.find({ madeBy: userId });

    res.status(200).json(allContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteContent(req: Request, res: Response) {
  const body = req.body as { id: string; userID: string };

  try {
    const { id: contentId, userID: userId } = body;

    if (!contentId || !userId) {
      return res.status(400).json({ message: "Missing content ID or user ID" });
    }

    const deleted = await Contents.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(contentId),
      madeBy: new mongoose.Types.ObjectId(userId),
    });

    if (!deleted) {
      return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.status(200).json({ message: "Content Deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
