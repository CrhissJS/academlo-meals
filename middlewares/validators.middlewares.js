const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map((err) => err.msg);
    const message = errorsArray.join(" /");
    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const userValidations = [
  body("name")
    .isString()
    .withMessage("Name would be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .notEmpty()
    .withMessage("Name can not be empty"),
  body("email").isEmail().withMessage("Email would be a valid email"),
  body("password")
    .isString()
    .withMessage("Password would be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .notEmpty()
    .withMessage("Password can not be empty"),
  checkValidations,
];

const restaurantValidations = [
  body("name")
    .isString()
    .withMessage("Name would be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .notEmpty()
    .withMessage("Name can not be empty"),
  body("address")
    .isString()
    .withMessage("Address would be a string")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters")
    .notEmpty()
    .withMessage("Address can not be empty"),
  body("rating")
    .isNumeric()
    .withMessage("Rating would be a number")
    .custom((value, { req }) => {
      if (value < 1 || value > 5) {
        throw new Error("Rating must be from 1 to 5");
      }
      [];
      return true;
    })
    .isInt()
    .withMessage("Rating would be an integer number")
    .notEmpty()
    .withMessage("Rating can not be empty"),
  checkValidations,
];

const mealsValidations = [
  body("name")
    .isString()
    .withMessage("Name would be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .notEmpty()
    .withMessage("Name can not be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price would be a number")
    .isInt()
    .withMessage("Price would be an integer number")
    .notEmpty()
    .withMessage("Price can not be empty"),
  checkValidations,
];

module.exports = { userValidations, restaurantValidations, mealsValidations };
