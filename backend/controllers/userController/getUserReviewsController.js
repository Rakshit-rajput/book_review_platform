
const Review = require("../../models/review");

const getUserReviewsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviews = await Review.find({ userId }).populate('bookId');
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reviews: " + error.message });
  }
};

module.exports = getUserReviewsController;
