import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedBooks } from "../utils/bookSlice"; // ✅ use correct thunk
import BookCard from "../components/BookCard";

const Home = () => {
  const dispatch = useDispatch();
  const { featuredBooks, isLoading, error } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchFeaturedBooks()); // ✅ fetch only featured books
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading featured books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Featured Books</h1>
      {featuredBooks.length === 0 ? (
        <p>No featured books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
