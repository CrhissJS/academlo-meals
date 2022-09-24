const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const mealExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findOne({
      where: { id, status: "active" },
      include: { model: Restaurant },
    });
    if (!meal) {
      return res.status(404).json({
        status: "error",
        message: "meal not found",
      });
    }
    req.meal = meal;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { mealExist };
