const User = require("../../models/user");

const loginController = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPassword = await user.validatePassword(password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // or "Strict" for better security
      secure: false, // use true only in HTTPS (production)
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong:" + error.message });
  }
};
module.exports = loginController;
