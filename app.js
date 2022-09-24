const express = require("express");
const app = express();

//Routes...
const { userRouter } = require("./routes/user.routes");
const { restaurantRouter } = require("./routes/restaurant.routes");
const { mealRouter } = require("./routes/meal.routes");
const { orderRouter } = require("./routes/order.routes");

//Establishing routers...
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

//Catching endpoint errors...
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method}${req.url} does not exist in our server`,
  });
});

module.exports = { app };
