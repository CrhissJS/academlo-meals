const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const createMeal = async (req, res) => {
  try {
    const { restaurant } = req;
    const { name, price } = req.body;
    const meal = await Meal.create({
      name,
      price,
      restaurantId: restaurant.id,
    });
    res.status(201).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      where: { status: "active" },
      include: { model: Restaurant, attributes: ["id", "name", "address"] },
    });
    res.status(200).json({
      status: "success",
      data: { meals },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealById = (req, res) => {
  try {
    const { meal } = req;
    res.status(200).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.lor(error);
  }
};

const updateMeal = async (req, res) => {
  try {
    const { meal } = req;
    const { name, price } = req.body;
    await meal.update({ name, price });
    res.status(200).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { meal } = req;
    await meal.update({ status: "deleted" });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
