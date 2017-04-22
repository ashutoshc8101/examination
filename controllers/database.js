/* jshint esversion : 6 */
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/examination");

mongoose.connection.once("open", function(err){
  if(err) throw err;
  console.log("Connected to Database");
});

const UserSchema = mongoose.Schema({
  username : String,
  password : String,
  email : String
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User : User
};
