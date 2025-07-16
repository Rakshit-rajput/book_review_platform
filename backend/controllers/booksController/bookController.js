const Books = require("../../models/books");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Books.find().lean();
    res.status(200).json(allBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching Books: " + error.message);
  }
};

module.exports = getAllBooks;
