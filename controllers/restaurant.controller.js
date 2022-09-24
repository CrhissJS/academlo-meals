const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

const createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;
    const restaurant = await Restaurant.create({
      name,
      address,
      rating,
    });
    res.status(201).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { status: "active" },
      include: { model: Review },
    });
    res.status(200).json({
      status: "success",
      data: { restaurants },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantById = (req, res) => {
  try {
    const { restaurant } = req;
    res.status(200).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;
    const { name, address } = req.body;
    await restaurant.update({
      name,
      address,
    });
    res.status(200).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;
    if (restaurant.status !== "inactive") {
      await restaurant.update({ status: "inactive" });
      res.status(204).json({
        status: "success",
      });
    }
    return res.status(400).json({
      status: "error",
      message: "this restaurant is already inactive",
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { restaurantId } = req.params;
    const { sessionUser } = req;
    const review = await Review.create({
      comment,
      rating,
      restaurantId,
      userId: sessionUser.id,
    });
    res.status(201).json({
      status: "success",
      data: review,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { review } = req;
    await review.update({
      comment,
      rating,
    });
    res.status(200).json({
      status: "success",
      data: { review },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  const { review } = req;
  try {
    if (review.status !== "deleted") {
      await review.update({ status: "deleted" });
      res.status(204).json({
        status: "success",
      });
    }
    return res.status(404).json({
      status: "error",
      message: "Sorry... this review is already deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
