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
module.exports = {
  validateStringData,
  validateBookData,
};
