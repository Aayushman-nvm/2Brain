import { Router } from "express";
import { handleLogin, handleLogout, handleRegister } from "../controller/auth";
import { handleContents, getContents, deleteContent } from "../controller/content";
import { handleShare, getLink } from "../controller/link"

export const router = Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.post("/logout", handleLogout);

router.post("/content", handleContents);
router.get("/content", getContents);
router.delete("/content", deleteContent);

router.post("/sharelink", handleShare);
router.get("/sharelink/:linkId", getLink);
