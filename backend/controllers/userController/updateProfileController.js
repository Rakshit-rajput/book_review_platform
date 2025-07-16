const User = require("../../models/user");
const { validateEditProfile } = require("../../utils/validate");

const updateProfileController = async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("No user found");
    }
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: `${user.firstName},your profile is updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).send("Error updating profile: " + error.message);
  }
};

module.exports = updateProfileController;
