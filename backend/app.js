const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const authRouter = require("./routes/authRouter");
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRouter");

require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourfrontend.com"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
//Routes
app.use("/auth", authRouter);
app.use("/", bookRouter);
app.use("/", userRouter);
app.use("/", reviewRouter);

const start = async () => {
  try {
    await connectDB().then(console.log("connected successfully"));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
    process.exit(1);
  }
};
start();
