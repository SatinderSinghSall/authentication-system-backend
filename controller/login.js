const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !email.trim()) {
      const error = new Error("Please enter your email address.");
      error.statusCode = 400;
      throw error;
    }

    if (!password || !password.trim()) {
      const error = new Error("Please enter your password.");
      error.statusCode = 400;
      throw error;
    }

    // Find user
    const foundUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    // No account found
    if (!foundUser) {
      const error = new Error("No account found with this email address.");
      error.statusCode = 404;
      throw error;
    }

    // Incorrect password
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordMatched) {
      const error = new Error("Incorrect password.");
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT
    const accessToken = generateToken(foundUser.email);

    // Cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: true,
      message: "Login successful.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
