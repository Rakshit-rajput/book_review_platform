import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch paginated books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/books?page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      return {
        books: data.allBooks,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch only featured books
export const fetchFeaturedBooks = createAsyncThunk(
  "books/fetchFeaturedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/books?featured=true",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch featured books");
      }
      const data = await response.json();
      return data.allBooks; // Your backend must handle ?featured=true and return filtered books
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    featuredBooks: [],
    isLoading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setFeaturedBooks: (state, action) => {
      state.featuredBooks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Books
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Featured Books
      .addCase(fetchFeaturedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredBooks = action.payload;
      })
      .addCase(fetchFeaturedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setBooks, setFeaturedBooks } = bookSlice.actions;
export default bookSlice.reducer;
