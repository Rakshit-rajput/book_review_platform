const isAdmin = async (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Forbidden: Admin access required");
  }
  next();
};
module.exports = isAdmin;
