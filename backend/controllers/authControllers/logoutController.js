const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successful!" });
};
module.exports = logoutController;
