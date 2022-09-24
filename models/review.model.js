const { DataTypes, db } = require("../utils/database.utils");

const Review = db.define("review", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  comment: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { Review };
