const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/booksController/getAllBooks");
const uploadBookController = require("../controllers/booksController/uploadBookController");
const getBookController = require("../controllers/booksController/getBookController");
const userAuth = require("../middlewares/userAuth");
const isAdmin = require("../middlewares/isAdmin");
bookRouter.get("/books", userAuth, bookController);
bookRouter.get("/book/:id", getBookController);
bookRouter.post("/books", userAuth, isAdmin, uploadBookController);

module.exports = bookRouter;
