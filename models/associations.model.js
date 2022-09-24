const { User } = require("../models/user.model");
const { Review } = require("../models/review.model");
const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const associations = () => {
  //1 Order <---> 1 Meal
  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  //1 User <---> M Orders
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  //1 User <--> M Reviews
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  //1 Restaurant <---> M Reviews
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  //1 Restaurant <---> M Meals
  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);
};

module.exports = { associations };
