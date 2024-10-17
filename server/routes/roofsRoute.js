import express from "express";
import RoofsController from "../controllers/roofsController.js";

const router = express.Router();

router.get("/", RoofsController.getRoofs);
router.get("/:id", RoofsController.getRoofById);

export default router;
