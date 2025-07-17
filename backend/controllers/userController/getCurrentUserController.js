
const getCurrentUserController = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = getCurrentUserController;
