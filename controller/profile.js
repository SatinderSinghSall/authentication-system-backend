const User = require("../models/User");

const profile = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.user.email,
    }).select("-password -password_otp -__v");

    if (!foundUser) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: true,
      message: "Profile fetched successfully.",
      user: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = profile;
