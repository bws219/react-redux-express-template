"use strict";
var express = require('express');
var router = express.Router();
const { User, Post, Comment, Vote } = require('../models');

module.exports = function(passport) {
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return res.json({
          success: false,
          message: 'Login failed!'
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({
          success: true,
          message: 'Login successful!'
        });
      });
    })(req, res, next);
  });

  router.post('/register', (req, res) => {
    const body = req.body;
    User.findAll({
      where: {
        username: body.username
      }
    })
			.then((searchResult) => {
  console.log(searchResult);
  if (searchResult.length) {
    res.json({
      success: false,
      message: 'Username ' + searchResult[0].dataValues.username + ' is taken.'
    });
  }				else {
    User.create({
      username: body.username,
      password: body.password
    })
						.then(insertResult => {
  res.json({
    success: true,
    message: 'Registered successfully!'
  });
});
  }
})
			.catch((err) => {
  res.json({
    success: false,
    message: 'Database error:' + err
  });
  console.log('Database error:', err);
});
  });

  router.post('/logout', (req, res) => {
    req.logout();
  });

  return router;
};
