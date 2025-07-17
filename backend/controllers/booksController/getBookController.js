const Book = require("../../models/books");

const getBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate({
      path: 'reviews',
      populate: {
        path: 'userId',
        select: 'firstName lastName' // Select the fields you want to populate
      }
    });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send("Error fetching book: " + error.message);
  }
};
module.exports = getBookController;
