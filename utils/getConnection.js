const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB database is connected successfully!");
  } catch (error) {
    console.error("Failed to connect MongoDB database.");
    console.error(error.message);
  }
};

module.exports = getConnection;
