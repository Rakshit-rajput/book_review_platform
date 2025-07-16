const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/booksController/bookController");
const uploadBookController = require("../controllers/booksController/uploadBookController");
const userAuth = require("../middlewares/userAuth");
const isAdmin = require("../middlewares/isAdmin");
bookRouter.get("/books", userAuth, bookController);
bookRouter.post("/books", userAuth, isAdmin, uploadBookController);

module.exports = bookRouter;
