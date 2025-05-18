const mongoose = require('mongoose');
const connectDB = async()=>
{
    try{
     await mongoose.connect("mongodb://127.0.0.1:27017/Authentication");
    console.log("Mongo Db connected!");
    }
    catch(e)
    {
        console.log("Error occured Connected to database");
    }
}
module.exports = connectDB;
