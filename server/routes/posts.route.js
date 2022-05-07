import express from "express";

import { postsController } from "../controllers/postsController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", postsController.get);
router.get("/search", postsController.getBySearch);
router.get("/:id", postsController.getById);

//router.use(auth);
router.post("/", auth, postsController.post);
router.patch("/:id", auth, postsController.patch);
router.delete("/:id", auth, postsController.delete);
router.patch("/:id/like", auth, postsController.like);
router.post("/:id/comment", auth, postsController.comment);

export default router;
