const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const orderExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      include: { model: Meal, include: { model: Restaurant } },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Error: order not found",
      });
    }
    req.order = order;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { orderExist };
