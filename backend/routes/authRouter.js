const express = require("express");
const authRouter = express.Router();
const SignUpController = require("../controllers/authControllers/signUpController");
const logoutController = require("../controllers/authControllers/logoutController");
const loginController = require("../controllers/authControllers/loginController");
authRouter.post("/signUp", SignUpController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
module.exports = authRouter;
