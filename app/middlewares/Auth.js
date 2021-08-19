var jwt = require("jsonwebtoken");
require("dotenv").config();

Auth = (req, res, next) => {
  if (!req.cookies.accessToken) {
    res.render("auth/login", { layout: false });
  } else {
    jwt.verify(
      req.cookies.accessToken,
      `${process.env.JWT_SECRET_KEY}`,
      function (err, decoded) {
        // console.log(decoded);
        req.userData = decoded;
      }
    );
    next();
  }
};

module.exports = Auth;
