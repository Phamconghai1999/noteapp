Auth = (req, res, next) => {
  console.log(req.cookies.Auth);
  if (!req.cookies.accessToken) {
    res.render("auth/login", { layout: false });
  } else {
    next();
  }
};

module.exports = Auth;
