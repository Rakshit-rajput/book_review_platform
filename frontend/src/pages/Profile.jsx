import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/authSlice";
import { Star } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/me/reviews`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user reviews");
        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateMessage("");
    setUpdateError("");

    if (password && password !== confirmPassword) {
      setUpdateError("Passwords do not match");
      return;
    }

    try {
      const updateData = { firstName, lastName };
      if (password) updateData.password = password;

      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage("Profile updated successfully!");
        if (data.data) {
          dispatch(login({ user: data.data, token: user.token }));
        }
        setPassword("");
        setConfirmPassword("");
        setShowUpdateForm(false);
      } else {
        setUpdateError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setUpdateError("An error occurred: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">Loading profile...</div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-8 text-gray-600">
        Please log in to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      {/* User Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Account Information
          </h2>
          {!showUpdateForm && (
            <button
              onClick={() => setShowUpdateForm(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-700">First Name:</span>
            <span className="text-gray-800">{user.firstName}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-700">Last Name:</span>
            <span className="text-gray-800">{user.lastName}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-700">Email:</span>
            <span className="text-gray-800">{user.emailId}</span>
          </div>
        </div>

        {/* Update Form (Conditional) */}
        {showUpdateForm && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password (optional)
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {updateMessage && (
                    <p className="text-sm text-green-600">{updateMessage}</p>
                  )}
                  {updateError && (
                    <p className="text-sm text-red-600">{updateError}</p>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUpdateForm(false);
                      setUpdateMessage("");
                      setUpdateError("");
                    }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* My Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Reviews</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {review.bookId?.bookName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {review.bookId?.authorName}
                </p>

                <div className="flex items-center mb-2">
                  <div className="flex">
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
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({review.rating}/5)
                  </span>
                </div>

                <p className="text-gray-700">{review.reviewText}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't reviewed any books yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
