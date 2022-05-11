import express from "express";

import { gamesController } from "../controllers/gamesController.js";

const router = express.Router();

router.get("/search", gamesController.get);

export default router;
