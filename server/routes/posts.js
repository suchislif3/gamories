import express from "express";

import { postsController } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", postsController.get);
router.post("/", postsController.post);

export default router;
