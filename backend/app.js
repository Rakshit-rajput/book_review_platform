const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const authRouter = require("./routes/authRouter");
const bookRouter = require("./routes/bookRouter");
const PORT = 5000;
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
//Routes
app.use("/auth", authRouter);
app.use("/", bookRouter);

const start = async () => {
  try {
    await connectDB().then(console.log("connected successfully"));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
    // process.exit(1);
  }
};
start();
