TEST = function TEST(req, res, next) {
  //console.log("from TEST| Socket port:", process.env.PORT);
  let port = process.env.PORT || 3000;
  res.cookie("ioport", `${port}`, {
    expires: 0, // new Date(Date.now() + 600000),
  });
  next();
};

module.exports = TEST;
