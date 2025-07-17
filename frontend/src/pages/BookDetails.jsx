import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/book/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{book.bookName}</h1>
      <p className="text-lg text-gray-700 mb-2">by {book.authorName}</p>
      <p className="text-gray-600 mb-4">Genre: {book.genre}</p>
      <p className="text-gray-800 mb-6">{book.description}</p>

      <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
      {book.reviews && book.reviews.length > 0 ? (
        <ul>
          {book.reviews.map((review) => (
            <li key={review._id} className="bg-gray-100 p-3 rounded-md mb-2">
              <p className="font-medium">{review.user ? review.user.firstName : 'Anonymous'}:</p>
              <p>{review.comment}</p>
              {/* Display rating if available */}
              {review.rating && <p>Rating: {review.rating}/5</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review this book!</p>
      )}
    </div>
  );
};

export default BookDetails;
