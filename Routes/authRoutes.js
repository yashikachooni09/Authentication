const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/login",authController.loginPage);
router.post("/login",authController.loginUser);

router.get("/signup",authController.signupPage);
router.post("/signup",authController.signupUser);

router.get("/forgotPasswd", authController.forgotPassPage); 
router.post("/forgotPasswd", authController.forgotUser);     

router.get("/verifyOtp",authController.verifyOtp);
router.post("/verifyOtp", authController.verifyResetOtp);

router.get("/resetPasswd/:email", authController.resetPage);
router.post("/resetPasswd/:email", authController.resetPasswd);


router.get("/", verifyToken, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;