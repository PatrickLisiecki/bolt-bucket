import express from "express";
import WheelsController from "../controllers/wheelsController.js";

const router = express.Router();

router.get("/", WheelsController.getWheels);
router.get("/:id", WheelsController.getWheelsById);

export default router;
