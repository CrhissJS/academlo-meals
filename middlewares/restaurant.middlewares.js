const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

const restaurantExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: { id },
      include: { model: Review },
    });

    if (!restaurant) {
      return res.status(404).json({
        status: "error",
        message: "restaurant not found",
      });
    }
    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { restaurantExist };
