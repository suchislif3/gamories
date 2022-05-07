import express from "express";

import { igdbController } from "../controllers/igdbController.js";

const router = express.Router();

router.get("/games", igdbController.get);

export default router;
