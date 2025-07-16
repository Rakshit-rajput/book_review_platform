const User = require("../../models/user");

const loginController = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isPassword = await user.validatePassword(password);
    if (!isPassword) {
      return res.status(401).send("Invalid email or password");
    }
    const token = user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).send({ message: "Login successful", user });
  } catch (error) {
    res.status(500).send("Something went wrong:" + error.message);
  }
};
module.exports = loginController;
