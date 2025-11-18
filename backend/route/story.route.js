import { Router } from "express";
import { getStories, getStoryBySlug } from "../controller/story.controller.js";

const router = Router();

router.get("/", getStories);
router.get("/:slug", getStoryBySlug);

export default router;
