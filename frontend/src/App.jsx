import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./utils/authSlice";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import UploadBook from "./pages/UploadBook";
import BookDetails from "./pages/BookDetails";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(login({ user: data.user, token: "dummy-token" }));
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route element={<AdminRoute />}>
          <Route path="/upload-book" element={<UploadBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
