import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";
import reviewReducer from "./reviewSlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    books: bookReducer,
    reviews: reviewReducer,
  },
});
