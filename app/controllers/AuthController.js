var jwt = require("jsonwebtoken");
const Account = require("../models/Account"); // import model from models.
require("dotenv").config();

class AuthController {
  // [GET] domain.com/auth/login
  // [GET] domain.com/auth/
  index(req, res, next) {
    if (!req.cookies.accessToken) {
      res.render("auth/login", { layout: false });
    } else {
      res.redirect("../me/profile");
    }
  }
  // [GET] domain.com/auth/logout
  logout(req, res, next) {
    res.clearCookie("accessToken");
    res.redirect("/auth");
  }
  // [GET] domain.com/auth/register
  showRegister(req, res) {
    res.render("auth/register", { layout: false });
  }

  // [POST] domain.com/auth/register
  register(req, res, next) {
    let { email, password, passwordRef } = req.body;
    if (password !== passwordRef) {
      res.render("auth/register", { layout: false, confirmError: true });
      return;
    }
    // check  existing email
    Account.findOne({ email })
      .then((dataUser) => {
        if (dataUser) {
          res.render("auth/register", { layout: false, registerError: true });
        } else {
          let regAccount = new Account({ email, password });
          regAccount
            .save()
            .then((userAccount) => {
              let accessToken = jwt.sign(
                { userId: `${userAccount._id}` },
                "privateKey",
                { algorithm: "RS256" }
              );
              res.cookie("accessToken", `${accessToken}`, {
                expires: new Date(Date.now() + 600000),
              });
              res.redirect("../me/profile");
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  }
  // [POST] domain.com/auth/login
  login(req, res, next) {
    let { email, password } = req.body;
    Account.findOne({ email, password })
      .then((dataUser) => {
        if (dataUser === null) {
          res.render("auth/login", { layout: false, loginError: true });
        } else {
          let accessToken = jwt.sign(
            { userId: `${dataUser._id}` },
            `${process.env.JWT_SECRET_KEY}`
          );
          res.cookie("accessToken", `${accessToken}`, {
            expires: new Date(Date.now() + 600000),
          });
          res.redirect("../me/profile");
        }
      })
      .catch((err) => next(err));
  }
  // [POST] domain.com/auth/login
}

module.exports = new AuthController(); // export class
