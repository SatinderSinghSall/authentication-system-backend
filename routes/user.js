const express = require("express");

const register = require("../controller/register");
const login = require("../controller/login");
const profile = require("../controller/profile");
const logout = require("../controller/logout");
const updateProfile = require("../controller/updateProfile");

const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);
router.post("/logout", logout);
router.put("/profile", auth, updateProfile);

module.exports = router;
