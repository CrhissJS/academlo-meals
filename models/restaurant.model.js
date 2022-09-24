const { DataTypes, db } = require("../utils/database.utils");

const Restaurant = db.define("restaurant", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    defaultValue: "active",
    type: DataTypes.STRING,
  },
});

module.exports = { Restaurant };
