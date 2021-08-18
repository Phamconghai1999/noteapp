Auth = (req, res, next) => {
  console.log(req.cookies.accessToken);
  if (!req.cookies.accessToken) {
    res.render("auth/login", { layout: false });
  } else {
    next();
  }
};

module.exports = Auth;
