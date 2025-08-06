import { nanoid } from "nanoid";
import { Request, Response } from "express";
import mongoose from "mongoose";

import { Links } from "../model/link";
import { Contents } from "../model/content";

export async function handleShare(req: Request, res: Response) {
  const body = req.body as { share: boolean; id: string };

  try {
    if (!body || typeof body.share !== "boolean" || !body.id) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    if (body.share) {
      const shareLink = await Links.create({
        userId: new mongoose.Types.ObjectId(body.id),
        hash: nanoid(5),
      });

      return res.status(201).json({shareLink:shareLink, link:"/sharelink/"+shareLink.hash});
    } else {
      await Links.deleteOne({
        userId: new mongoose.Types.ObjectId(body.id),
      });
      return res.status(201).json({ message: "Deleted shareable link" });
    }
  } catch (error) {
    console.error("Error creating share link:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getLink(req: Request, res: Response) {
  try {
    const { linkId } = req.params;
    console.log("Link ID: ",linkId);

    const linkDoc = await Links.findOne({ hash:linkId });
    console.log("Link Doc: ",linkDoc);
    if (!linkDoc) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    const content = await Contents.find({ madeBy: linkDoc.userId });
    console.log("Link Content: ",content);
    if (!content) {
      return res
        .status(404)
        .json({ message: "No content found for this link" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
