const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.redirect("/login");

    req.user = user; 
    next();
  } catch (err) {
    console.error("JWT error:", err);
    res.redirect("/login");
  }
};
