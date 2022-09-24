const { app } = require("./app");
const { associations } = require("./models/associations.model");
const { db } = require("./utils/database.utils");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await db.authenticate();

    //Establishing relationships...
    associations();

    await db.sync();

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log("Express app running");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
