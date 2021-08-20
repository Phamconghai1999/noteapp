TEST = function TEST(req, res, next) {
  console.log("from TEST| Socket port:", process.env.PORT);
  res.cookie("ioport", `${process.env.PORT}`, {
    expires: 0, // new Date(Date.now() + 600000),
  });
  next();
};

module.exports = TEST;
