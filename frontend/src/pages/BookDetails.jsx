import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReviews, addReview } from "../utils/reviewSlice";
import { Star } from "lucide-react"; // For rating display

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/book/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
        dispatch(setReviews(data.reviews));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, dispatch]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) {
      alert("Please provide a review and a rating.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId: id, reviewText, rating }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(addReview(data.review));
        setReviewText("");
        setRating(0);
      } else {
        throw new Error(data.error || "Failed to submit review");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return (
      <div className="text-center py-8 text-gray-600">Book not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Book Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          {book.image && (
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={book.image}
                alt={book.bookName}
                className="w-full h-auto rounded-lg object-cover shadow-md"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {book.bookName}
                </h1>
                <p className="text-lg text-gray-600 mb-1">
                  by {book.authorName}
                </p>
                {book.featured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </span>
                )}
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {book.genre}
              </span>
            </div>
            <p className="mt-4 text-gray-700">{book.description}</p>
          </div>
        </div>
      </div>

      {/* Review Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Leave a Review
        </h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="0" disabled>
                Select a rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} -{" "}
                  {num === 1
                    ? "Poor"
                    : num === 5
                    ? "Excellent"
                    : ["Fair", "Good", "Very Good"][num - 2]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review
            </label>
            <textarea
              id="review"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Share your thoughts about this book..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-500">
                      ({review.rating}/5)
                    </span>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-medium text-gray-800">
                  {review.userId ? review.userId.firstName : "Anonymous"}
                </p>
                <p className="text-gray-700 mt-1">{review.reviewText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review this book!
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
