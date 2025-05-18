const bcrypt = require('bcrypt');
const User = require('../models/User');
const Otp = require("../models/otp");
const jwt = require('jsonwebtoken');
const { sendOTP } = require("../utils/sendMail");

//login 

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.loginUser = async (req,res)=>
{
    try
    {
    const {email,password}  = req.body;
    const user = await User.findOne({email});
    if(!user)
    {
        return res.send("User not Found!");
    }
    const isMatch = await bcrypt.compare(password , user.password );
    if(!isMatch)
    {
        return res.send("Invalid Password");
    }
    
    const token = jwt.sign(
        {userId : user._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    );
     // Send token (cookie/localStorage/header etc.)

     res.cookie('token',token);
     res.redirect("/");
    }
   catch (error) {
    console.error('Login Error:', error);
    res.status(500).send('Server Error');
  }
}

//signup

exports.signupPage = (req, res) => {
  res.render("signup");
};

exports.signupUser = async (req,res)=>
{
try{
    const {username,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        return res.send("User Already Exist!");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        email,
        password : hashedPassword
    });
    await newUser.save();
    res.redirect("/login");
}
catch(e)
{
    console.log("Signup Error:",e);
    res.status(500).send("Server Error");
}
}

//forgotPassword

exports.forgotPassPage = (req, res) => {
  res.render("forgotPassword");
};
exports.forgotUser = async (req,res)=>
{
  try
  {
   const {email} = req.body;
  const user = await User.findOne({email});
  if(!user)
  {
    return res.send("Email  does not exist!");
  }
 const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ email, otp: otpCode });
   await sendOTP(email, otpCode);
    res.render("otp", { email });
  }
  catch(e)
  {
      console.error(" Error in Frogot password:", e);
    res.status(500).send("Something went wrong while Forgot the password. Please try again.");

  }
}

//Dashboard

exports.dashboardPage = (req, res) => {
  res.render("dashboard", { user: req.user });
};

//Reset Page

exports.resetPage = (req, res) => {
   const { email } = req.params;
   res.render("resetPasswd", { email });
};
exports.resetPasswd = async(req,res)=>
{
  try
  {
  const {password,confirmPassword} = req.body;
  const email = req.params.email;

  if(password !== confirmPassword)
  {
    return res.send("Password do not match!");
  }
  const hashedPassword = await bcrypt.hash(password,10);
  await User.findOneAndUpdate({email},{password:hashedPassword});
  res.send("Password Reset Successfully <a href='/login'>Login </a>");
  }
catch (e) {
    console.error(" Error in resetting password:", e);
    res.status(500).send("Something went wrong while resetting the password. Please try again.");
  }
};

//Verify Otp

exports.verifyOtp = (req,res)=>
{
  const email = req.query.email;  
  if (!email) return res.status(400).send("Email not provided");
  res.render("otp", { email });}

exports.verifyResetOtp = async(req,res)=>
{
  try
  {
  const {email,otp} = req.body;
  const validOtp = await Otp.findOne({email,otp});
  if(!validOtp)
  {
    return res.send("Invalid or expired OTP");
  }
    // Clean OTP
  await Otp.deleteMany({ email });

  res.redirect(`/resetPasswd/${email}`);
}
catch (e) {
    console.error(" Error verifying OTP:", e);
    res.status(500).send("Something went wrong while verifying OTP. Please try again.");
  }
};