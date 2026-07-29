const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const googleAuth = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.user._json?.email,
    });
    let savedUser;

    if (!foundUser) {
      const newUser = new User({
        name: req.user._json?.name,
        email: req.user._json?.email,
      });

      savedUser = await newUser.save();
    }

    const accessToken = generateToken(
      foundUser ? foundUser.email : savedUser.email,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = googleAuth;
