const Book = require("../../models/books");
const { validateBookData } = require("../../utils/validate");
const uploadBookController = async (req, res) => {
  try {
    validateBookData(req);
    const { bookName, authorName, description, genre, image } = req.body;
    const book = new Book({
      bookName,
      authorName,
      description,
      genre,
      image,
    });
    await book.save();
    res.status(200).send("book uploaded successfully");
  } catch (error) {
    res.status(500).send("error while uploading" + error.message);
  }
};
module.exports = uploadBookController;
