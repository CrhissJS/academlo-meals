const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { protectAdmin } = require("../middlewares/auth.middlewares");

dotenv.config({ path: "./config.env" });

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //Establishing roles...
    if (role !== "admin" && role !== "normal") {
      return res.status(404).json({
        status: "error",
        message: "Invalid role: must be (admin) or (normal) ",
      });
    }

    //Crypting password...
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    const userUpdate = await user.update({
      name,
      email,
    });
    res.status(200).json({
      status: "success",
      data: { userUpdate },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: "inactive" });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { sessionUser } = req;
    const ordersUser = await Order.findAll({
      where: { status: "active", userId: sessionUser.id },
      include: { model: Meal, include: { model: Restaurant } },
    });

    res.status(200).json({
      status: "success",
      data: { ordersUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderByUser = (req, res) => {
  try {
    const { order } = req;

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

//Establishing login...
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Cheking if email given exist and is active...
    const user = await User.findOne({ where: { email, status: "active" } });

    //Comparing passwords...
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({
        status: "error",
        message: "Wrong credentials",
      });
    }
    user.password = undefined;

    //Generating jwt...
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({
      status: "success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrdersByUser,
  getOrderByUser,
};
