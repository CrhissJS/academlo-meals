const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/user.model");

dotenv.config({ path: "./config.env" });

const protectSession = async (req, res, next) => {
  try {
    //Getting token...
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //Extracting token...
      token = req.headers.authorization.split(" ")[1]; //[Bearer, token]
    }
    // //checking if token was sent...
    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "Error: invalid session",
      });
    }
    //Verifying token...
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`You are in userId:${decoded.id} session`);
    // console.log(decoded);

    //Verifying tokens owner...
    const user = await User.findOne({
      where: { id: decoded.id, status: "active" },
    });
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "Error: The session owner is not correct or is inactive",
      });
    }
    //Accessing...
    req.sessionUser = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectUserAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return res.status(403).json({
      status: "error",
      message: "Error: this isn't your account, please login in your own",
    });
  }
  next();
};
const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;
  if (sessionUser.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Process denied by normal role, only an admin role can do it",
    });
  }
  next();
};

const protectOrderOwners = (req, res, next) => {
  const { sessionUser, order } = req;
  if (sessionUser.id !== order.userId) {
    return res.status(403).json({
      status: "error",
      message: "Error: this is not your order",
    });
  }
  next();
};

const protectReviewOwners = (req, res, next) => {
  const { sessionUser, review } = req;
  if (sessionUser.id !== review.userId) {
    return res.status(403).json({
      status: "error",
      message: "Error: this is not your review",
    });
  }
  next();
};

module.exports = {
  protectSession,
  protectUserAccount,
  protectOrderOwners,
  protectReviewOwners,
  protectAdmin,
};
