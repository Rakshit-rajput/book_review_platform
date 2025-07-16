const { validateStringData } = require("../../utils/validate");
const User = require("../../models/user");

const SignUpController = async (req, res) => {
  try {
    validateStringData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //checking is user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("ERROR:Email already registered");
    }
    const user = new User({
      firstName,
      lastName,
      emailId: emailId,
      password: password,
    });
    await user.save();
    //Generate jwt token for session handling
    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ message: "User added successfully", user });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(400).send("ERROR:" + error.message);
  }
};
module.exports = SignUpController;
