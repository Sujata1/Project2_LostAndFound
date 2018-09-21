
require("dotenv").config();
var nodemailer = require('nodemailer');
var newAuth = require("./emailAuth.js");

var emailAuth = newAuth.auth;

var transporter = nodemailer.createTransport({
    name: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: emailAuth
  });
  

module.exports = transporter;  