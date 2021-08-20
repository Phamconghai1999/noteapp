var jwt = require("jsonwebtoken");

socketIO = (app) => {
  var server = require("http").Server(app);
  var io = require("socket.io")(server);
  const port = process.env.PORT || 3000;

  //
  io.on("connect", (socket) => {
    var accessToken;
    var userData;
    var cookies = socket.handshake.headers.cookie;
    if (cookies.indexOf(";") >= 0) {
      cookies = cookies.split(";");
      for (let cookie of cookies) {
        cookie.startsWith("accessToken") || cookie.startsWith(" accessToken")
          ? (accessToken = cookie.split("=")[1])
          : (accessToken = "noToken");
      }
    }
    jwt.verify(
      accessToken,
      `${process.env.JWT_SECRET_KEY}`,
      function (err, decoded) {
        userData = decoded;
      }
    );
    socket.on("globalChanel", (data) => {
      console.log(data);
      if (data.accessToken) {
        jwt.verify(
          data.accessToken,
          `${process.env.JWT_SECRET_KEY}`,
          function (err, decoded) {
            try {
              if (decoded.userName) {
                sendGlobalChanel = {
                  userName: decoded.userName,
                  message: data.message,
                };
                io.emit("globalChanel", sendGlobalChanel);
              }
            } catch (error) {
              console.log(msg);
            }
          }
        );
      }
    });
    socket.on("disconnect", () => {
      /* … */
    });
  });
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = socketIO;
