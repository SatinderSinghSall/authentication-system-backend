const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      const error = new Error(
        "An account with this email address already exists.",
      );
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
