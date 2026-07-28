require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// Google Login config:
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend server is LIVE & running.");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),

  (req, res, next) => {
    res.redirect("http://localhost:3000/user/profile");
  },
);

app.listen(port, () => {
  console.log(`Server's backend is running on port: ${port}`);
});
