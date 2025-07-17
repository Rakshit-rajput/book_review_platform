const Books = require("../../models/books");

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { featured } = req.query;

    // Build query filter
    const filter = {};
    if (featured === "true") {
      filter.featured = true; // correct field name from your schema
    }

    const totalBooks = await Books.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Books.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      allBooks: books,
      currentPage: page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books: " + error.message });
  }
};

module.exports = getAllBooks;
