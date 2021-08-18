Auth = function Auth(req, res, next) {
  console.log("Request URL:", req.headers);
  next();
};

module.exports = Auth;
