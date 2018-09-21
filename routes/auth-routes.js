// *********************************************************************************
// auth-routes.js - this file ahuthorises session token
// *********************************************************************************

// Dependencies
// =============================================================

var path = require('path');
var jwt = require('jsonwebtoken');

// Routes
// =============================================================
var express = require('express');
var router = express.Router();


router.get('/auth', verifytoken, function (req, res) {
  console.log(req.headers);
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        status: '404',
      });
    } else {
      res.json({
        status: '200',
      });
    };
  });
});


// Verify Token
function verifytoken(req, res, next) {
  //Get auth header value
  console.log(req.headers);
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //next middleware
    next();

  } else {
    //Forbidden
    res.sendStatus(403);

  }
};

module.exports = router;