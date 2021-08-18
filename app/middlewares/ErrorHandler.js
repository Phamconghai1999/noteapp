ErrorHandler = function ErrorHandler(err, req, res, next) {
  console.log("ERROR:", err.message);
  res.status(400).send(err.message);
};

module.exports = ErrorHandler;
