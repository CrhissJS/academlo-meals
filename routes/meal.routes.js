const express = require("express");

// Controllers
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/meal.controller.js");

// Middlewares
const { mealExist } = require("../middlewares/meals.middlewares.js");
const { restaurantExist } = require("../middlewares/restaurant.middlewares");
const { mealsValidations } = require("../middlewares/validators.middlewares");
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");

const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", mealExist, getMealById);

// Protecting routes using jwt
mealRouter.use(protectSession);

mealRouter.post("/:id", restaurantExist, mealsValidations, createMeal);
mealRouter.patch("/:id", mealExist, protectAdmin, updateMeal);
mealRouter.delete("/:id", mealExist, protectAdmin, deleteMeal);

module.exports = { mealRouter };
