const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Signup = require("../models/signUp.js");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");



//Sales
router.get("/login",connectEnsureLogin.ensureLoggedOut(), (req, res) => {
  res.render("login");
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', {loginerror:"Email or Password is incorrect"});
  }


    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/users');
    });

  })(req, res, next);
});






router.get("/workers/login",connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("login");
});

router.post('/workers/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/workers/login?info=' + info);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        
        if (req.user.role === "manager") {
          return res.redirect('/managerDash');
        } else if (req.user.role === "director") {
          return res.redirect('/directorDash')
        } else {
          return res.redirect('/regularDash')
        }
      });

    })(req, res, next);
});



module.exports = router