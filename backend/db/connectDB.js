const mongoose = require("mongoose");
require("dotenv").config({ debug: true });

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB;
