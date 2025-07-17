const Book = require("../../models/books");
const { validateBookData } = require("../../utils/validate");

const uploadBookController = async (req, res) => {
  try {
    validateBookData(req);
    const { bookName, authorName, description, genre, image, featured } =
      req.body;

    const book = new Book({
      bookName,
      authorName,
      description,
      genre,
      image,
      featured,
    });

    await book.save();

    res.status(200).json({ message: "Book uploaded successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while uploading: " + error.message });
  }
};
module.exports = uploadBookController;
