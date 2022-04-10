import express from "express";

import { postsController } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", postsController.get);
router.post("/", postsController.post);
router.patch("/:id", postsController.patch);
router.delete("/:id", postsController.delete);
router.patch("/:id/likepost", postsController.likePost);

export default router;
