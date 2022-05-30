var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("user is  logged in user  " + req.session.userId);
  res.render("index", { title: "Express" });
});

//  these two routes are to login using  the google account
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/articles",
    failureRedirect: "/users/login",
  })
);

// these two account are to login usin  the github account
router.get("/auth/github", passport.authenticate("github"));
// callback resposible for the response from the server of the user

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/users/login" }),
  (req, res) => {
    res.redirect("/articles");
  }
);

module.exports = router;