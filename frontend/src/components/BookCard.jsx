import { Star } from "lucide-react"; // Install with: npm install lucide-react
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book._id}`} className="block">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 m-8">
        {/* Featured Badge */}
        {book.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white p-1 rounded-full z-10">
            <Star className="h-4 w-4" fill="currentColor" />
          </div>
        )}

        {/* Book Cover */}
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {book.image ? (
            <img
              src={book.image}
              alt={book.bookName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {book.bookName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {book.authorName}</p>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (book.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({book.rating || 0}/5)</span>
          </div>

          {/* Genre Badge */}
          <div className="mt-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {book.genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Example usage:
// <BookCard book={{
//   bookName: "The Great Novel",
//   authorName: "Jane Doe",
//   rating: 4,
//   genre: "Fiction",
//   featured: true,
//   image: "/book-cover.jpg"
// }} />

export default BookCard;
