const Book = require("../../models/books");
const Review = require("../../models/review");
const { validateReviewData } = require("../../utils/validate");

const postReviewController = async (req, res) => {
  try {
    const { bookId, reviewText, rating } = req.body;
    const userId = req.user._id;

    // Validate input data (throws error if invalid)
    validateReviewData(req);

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ userId, bookId });
    if (existingReview) {
      return res.status(400).json({ error: "You already reviewed this book" });
    }

    // Create and save review
    const review = new Review({
      userId,
      bookId,
      reviewText,
      rating,
    });
    await review.save();

    // Update book's reviews array
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Review submission error:", error.message);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to submit review",
    });
  }
};

module.exports = postReviewController;
