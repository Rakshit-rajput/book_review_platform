const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.send("Logout Successful!");
};
module.exports = logoutController;
