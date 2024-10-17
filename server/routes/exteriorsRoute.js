import express from "express";
import ExteriorsController from "../controllers/exteriorsController.js";

const router = express.Router();

router.get("/", ExteriorsController.getExteriors);
router.get("/:id", ExteriorsController.getExteriorById);

export default router;
