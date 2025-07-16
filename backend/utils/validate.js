const validator = require("validator");
const validateStringData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Strong");
  }
};
const validateBookData = (req) => {
  const { bookName, authorName, description, genre } = req.body;
  if (!bookName || !authorName || !description || !genre) {
    throw new Error("complete information is needed");
  }
};
const validateEditProfile = (req) => {
  const allowedEditProfile = ["firstName", "lastName", "password"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditProfile.includes(field)
  );
  return isEditAllowed;
};
const validateReviewData = (req) => {
  const { bookId, reviewText, rating } = req.body;
  const allowedFields = ["bookId", "reviewText", "rating"];
  const receivedFields = Object.keys(req.body);

  const hasInvalidFields = receivedFields.some(
    (field) => !allowedFields.includes(field)
  );
  if (hasInvalidFields) {
    throw new Error("Invalid fields in request");
  }

  if (!bookId || !reviewText || rating === undefined) {
    throw new Error("Missing required fields");
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new Error("Rating must be a number between 1 and 5");
  }
};
module.exports = {
  validateStringData,
  validateBookData,
  validateEditProfile,
  validateReviewData,
};
