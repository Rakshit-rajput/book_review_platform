const express = require("express");
const userRouter = express.Router();
const getUserController = require("../controllers/userController/getUserController");
const updateProfileController = require("../controllers/userController/updateProfileController");
userRouter.get("/users/:id", getUserController);
userRouter.put("/users/:id", updateProfileController);
module.exports = userRouter;
