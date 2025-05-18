require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./Routes/authRoutes");
const connectDB = require("./config/db");
const path = require("path");


connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.use("/", AuthRoutes);

app.listen(3005, () => {
  console.log("Server is listening on port 3005");
});
