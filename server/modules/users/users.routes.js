const {
  register,
  verifyEmail,
  verifyLogin,
  login,
  loginuser,
  logoutUser,
  updateUserData,
  verifyforgotpassword,
  forgotpassword,
} = require("./users.controlers");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../utils/auth");

router.post("/signup", register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login);
router.post("/verifyLogin", verifyLogin);
router.get("/auth", isAuthenticated, loginuser);
router.post("/logout", logoutUser);
router.put("/update", isAuthenticated, updateUserData);
router.post("/forgotpassword", forgotpassword);
router.post("/verifyForgotPassword", verifyforgotpassword);

module.exports = router;
