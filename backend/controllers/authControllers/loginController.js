const User = require("../../models/user");

const loginController = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }
    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      const token = user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Something went wrong:" + error.message);
  }
};
module.exports = loginController;
