const express = require("express");

// Controllers
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurant.controller");

// Middlewares
const { restaurantExist } = require("../middlewares/restaurant.middlewares");
const { reviewExist } = require("../middlewares/review.middlewares");
const {
  restaurantValidations,
} = require("../middlewares/validators.middlewares");
const {
  protectSession,
  protectAdmin,
  protectReviewOwners,
} = require("../middlewares/auth.middlewares");

const restaurantRouter = express.Router();

restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.get("/:id", restaurantExist, getRestaurantById);

// Protecting routes using jwt
restaurantRouter.use(protectSession);

restaurantRouter.post("/", restaurantValidations, createRestaurant);
restaurantRouter.patch("/:id", restaurantExist, protectAdmin, updateRestaurant);
restaurantRouter.delete(
  "/:id",
  restaurantExist,
  protectAdmin,
  deleteRestaurant
); // Protecting admin
restaurantRouter.post("/reviews/:restaurantId", createReview);
restaurantRouter.patch(
  "/reviews/:id",
  reviewExist,
  protectReviewOwners,
  updateReview
); // Protecting owner
restaurantRouter.delete(
  "/reviews/:id",
  reviewExist,
  protectReviewOwners,
  deleteReview
); // Protecting owner

module.exports = { restaurantRouter };
