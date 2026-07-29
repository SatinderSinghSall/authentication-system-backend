const User = require("../models/User");

const googleAuth = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.user._json?.email,
    });

    if (!foundUser) {
      const newUser = new User({
        name: req.user._json?.name,
        email: req.user._json?.email,
      });

      await newUser.save();
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = googleAuth;
