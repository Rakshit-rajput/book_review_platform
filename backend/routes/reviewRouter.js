const express = require("express");
const reviewRouter = express.Router();
const postReviewController = require("../controllers/reviewControllers/postReviewController");
const getAllReviewsController = require("../controllers/reviewControllers/getAllReviews");
const userAuth = require("../middlewares/userAuth");
reviewRouter.get("/reviews", getAllReviewsController);
reviewRouter.post("/reviews", userAuth, postReviewController);
module.exports = reviewRouter;
