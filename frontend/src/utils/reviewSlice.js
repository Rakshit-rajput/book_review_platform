
import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], loading: false, error: null },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
});

export const { setReviews, addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
