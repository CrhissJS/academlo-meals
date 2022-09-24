const express = require("express");

// Controllers
const {
  createUser,
  logInUser,
  updateUser,
  deleteUser,
  getAllOrdersByUser,
  getOrderByUser,
  login,
} = require("../controllers/user.controller");

// Middlewares
const { userExist } = require("../middlewares/user.middlewares");
const { orderExist } = require("../middlewares/order.middlewares");
const { userValidations } = require("../middlewares/validators.middlewares");
const {
  protectSession,
  protectUserAccount,
  protectAdmin,
  protectOrderOwners,
} = require("../middlewares/auth.middlewares");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", userValidations, createUser);

// Protecting routes using jwt
userRouter.use(protectSession);

userRouter.patch("/:id", userExist, protectUserAccount, updateUser);
userRouter.delete("/:id", userExist, protectUserAccount, deleteUser);
userRouter.get("/orders", getAllOrdersByUser);
userRouter.get("/orders/:id", orderExist, protectOrderOwners, getOrderByUser);

module.exports = { userRouter };
