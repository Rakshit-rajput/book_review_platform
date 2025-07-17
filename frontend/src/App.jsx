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
