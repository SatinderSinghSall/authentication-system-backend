const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "7d",
    },
  );
};

module.exports = generateToken;
