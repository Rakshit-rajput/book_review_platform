const Book = require("../../models/books");
const review = require("../../models/review");
const getAllReviewsController = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      res.status(400).json({ message: "No book found", error });
    }
    const reviews = await review.find({ bookId: bookId }).populate('userId', 'firstName lastName').lean();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch reviews",
      details: error.message,
    });
  }
};
module.exports = getAllReviewsController;
