TEST = function TEST(req, res, next) {
  // console.log("from TEST| Request URL:", req.headers);
  next();
};

module.exports = TEST;
