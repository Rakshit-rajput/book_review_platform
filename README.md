
# Book Review Project

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to discover, review, and discuss books. It provides a platform for users to share their opinions and ratings on various books.

## Features

*   **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
*   **Book Listings:** Browse and search for books in the database.
*   **Detailed Book View:** View comprehensive details for each book, including author, genre, description, and user reviews.
*   **Review and Rating System:** Authenticated users can post reviews and assign a rating (1-5 stars) to any book.
*   **User Profile:** (Future Scope) View and manage user-specific information and review history.
*   **Admin Panel:** (Future Scope) Admins can add, update, or remove book listings.

## Tech Stack

### Backend

*   **Node.js:** A JavaScript runtime for building the server-side application.
*   **Express.js:** A web application framework for Node.js, used to build the RESTful API.
*   **MongoDB:** A NoSQL database used to store book, user, and review data.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
*   **JWT (JSON Web Tokens):** Used for creating secure access tokens for authentication.
*   **`cookie-parser`:** Middleware to parse and manage cookies for authentication.

### Frontend

*   **React:** A JavaScript library for building the user interface.
*   **React Router:** For handling client-side routing and navigation.
*   **Redux Toolkit:** For managing the application's state, including authentication, books, and reviews.
*   **Vite:** A modern and fast build tool for frontend development.
*   **Tailwind CSS:** A utility-first CSS framework for styling the application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js** (v14 or later)
*   **npm** (or yarn)
*   **MongoDB:** Make sure you have a running instance of MongoDB (local or cloud-based).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bookreviewproject.git
    cd bookreviewproject
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Create a `.env` file** in the `backend` directory.
2.  **Add the following environment variables** to the `.env` file:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

    *   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/bookreviewdb`).
    *   `JWT_SECRET`: A secret key for signing JWTs.

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory, run:
    ```bash
    npm start
    ```
    The backend server will start on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    From the `frontend` directory, run:
    ```bash
    npm run dev
    ```
    The frontend development server will start on `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

The backend provides the following RESTful API endpoints:

### Authentication

*   `POST /auth/signup`: Register a new user.
*   `POST /auth/login`: Log in an existing user and receive an auth cookie.
*   `POST /auth/logout`: Log out the current user.

### Users

*   `GET /users/me`: Get the profile of the currently authenticated user.

### Books

*   `GET /book`: Get a list of all books.
*   `GET /book/:id`: Get the details of a single book, including its reviews.

### Reviews

*   `POST /reviews`: Submit a new review for a book.
*   `GET /reviews`: Get all reviews for a specific book (requires `bookId` in the request body).

#### To set admin
* Open your MongoDB instance (via MongoDB Compass, Atlas, or shell).

* Navigate to the users collection in your database.

* Find the user document you want to make admin — you can search by email or _id.

* Edit the user document:

* Change the "role" field from "user" to "admin".

<!-- Edit
{
  "role": "admin"
}
Save the changes. -->

* Now this user has admin privileges in your application (assuming your backend checks for user.role === 'admin').