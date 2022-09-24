const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const createOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;
    const meal = await Meal.findOne({
      where: { id: mealId, status: "active" },
    });
    if (!meal) {
      return res.status(404).json({
        status: "error",
        message: "Sorry... we dont have this meal",
      });
    }
    const order = await Order.create({
      quantity,
      mealId,
      userId: sessionUser.id,
      totalPrice: quantity * meal.price,
      include: { model: Meal },
    });
    res.status(201).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { sessionUser } = req;
    const orders = await Order.findAll({
      where: { userId: sessionUser.id },
      include: {
        model: Meal,
        include: { model: Restaurant },
      },
    });
    res.status(200).json({
      status: "success",
      data: { orders },
    });
  } catch (error) {
    console.log(error);
  }
};

const CompleteOrder = async (req, res) => {
  try {
    const { order } = req;
    if (order.status === "active") {
      await order.update({ status: "completed" });
    } else {
      return res.status(404).json({
        status: "error",
        message: `Sorry... this order is already ${order.status}`,
      });
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const CancelOrder = async (req, res) => {
  try {
    const { order } = req;
    if (order.status === "active") {
      await order.update({ status: "cancelled" });
    } else {
      return res.status(404).json({
        status: "error",
        message: `Sorry... this order is already ${order.status}`,
      });
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  CompleteOrder,
  CancelOrder,
};
