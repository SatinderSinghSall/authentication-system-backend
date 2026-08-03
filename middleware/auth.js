const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      const error = new Error("Please login first.");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = auth;
