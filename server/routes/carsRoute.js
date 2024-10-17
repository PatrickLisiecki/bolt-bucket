import express from "express";
import CarsController from "../controllers/carsController.js";

const router = express.Router();

// Route to get all cars
router.get("/", CarsController.getCars);

// Route to get a car by ID
router.get("/:id", CarsController.getCarById);

// Route to create a new car
router.post("/", CarsController.createCar);

// Route to update a car
router.put("/:id", CarsController.updateCar);

// Route to delete a car
router.delete("/:id", CarsController.deleteCar);

export default router;
