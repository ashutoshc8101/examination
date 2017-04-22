/* jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Database = require("./controllers/database.js");
const flash = require("express-flash");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("port", process.env.PORT || 7878);

app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require("./controllers/authenication.js")(app, passport, Database.User, LocalStrategy, bcrypt);
require("./controllers/routes.js")(app);

app.listen(app.get("port"), function(){
  console.log(`listening on port ${app.get('port')}`);
});
