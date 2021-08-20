TEST = function TEST(req, res, next) {
  //console.log("from TEST| Socket port:", process.env.PORT);
  next();
};

module.exports = TEST;
