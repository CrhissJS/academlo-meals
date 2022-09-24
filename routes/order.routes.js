const express = require("express");

//Controllers...
const {
  createOrder,
  getAllOrders,
  CompleteOrder,
  CancelOrder,
} = require("../controllers/order.controller");

//Middlewares...
const { orderExist } = require("../middlewares/order.middlewares");
const {
  protectSession,
  protectOrderOwners,
} = require("../middlewares/auth.middlewares.js");

const orderRouter = express.Router();

//Protecting routes con jwt...
orderRouter.use(protectSession);

orderRouter.post("/", createOrder);
orderRouter.get("/me", getAllOrders);
orderRouter.patch("/:id", orderExist, protectOrderOwners, CompleteOrder); //Protecting owner...
orderRouter.delete("/:id", orderExist, protectOrderOwners, CancelOrder); //Protecting owner...

module.exports = { orderRouter };
