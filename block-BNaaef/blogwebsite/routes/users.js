var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// if the user is successfully registered then show this page
router.get("/", (req, res) => {
  let { userId: id } = req.session;
  console.log(`Getting  the session object user id is :${id}`);
  res.render("users");
});

router.get("/login", (req, res) => {
  console.log("Getting inside the  login page");
  res.render("userlogin");
});

// logout user
router.get("/logout", (req, res) => {
  let id = req.session.userId;
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/users/login");
});

module.exports = router;