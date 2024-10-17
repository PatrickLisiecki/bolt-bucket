import express from "express";
import InteriorsController from "../controllers/interiorsController.js";

const router = express.Router();

router.get("/", InteriorsController.getInteriors);
router.get("/:id", InteriorsController.getInteriorById);

export default router;
