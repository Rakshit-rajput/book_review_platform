const Books = require("../../models/books");

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const allBooks = await Books.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    res.status(200).json({ allBooks, page: page, totalPages: await Books.countDocuments()/limit });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching Books: " + error.message);
  }
};

module.exports = getAllBooks;
