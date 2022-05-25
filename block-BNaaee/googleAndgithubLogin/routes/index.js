var express = require("express");
const passport = require("passport");
const { rawListeners } = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/failure", (req, res) => {
  res.send("  authetication is failed");
});

router.get("/sucess", (req, res) => {
  console.log(req.user);
  res.send("  authetication is sucess user is logged in sucessfully");
});

//  these two routes are to login using  the google account
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/sucess",
    failureRedirect: "/failure",
  })
);

// these two account are to login usin  the github account
router.get("/auth/github", passport.authenticate("github"));
// callback resposible for the response from the server of the user

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/failure" }),
  (req, res) => {
    res.redirect("/sucess");
  }
);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/failure" }),
//   (req, res) => {
//     res.redirect("/sucess");
//   }
// );

module.exports = router;