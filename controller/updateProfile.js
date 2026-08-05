const User = require("../models/User");

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    // Check if email already exists
    const existing = await User.findOne({
      email,
      _id: { $ne: user._id },
    });

    if (existing) {
      return res.status(400).json({
        status: false,
        message: "Email already exists.",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.json({
      status: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProfile;
