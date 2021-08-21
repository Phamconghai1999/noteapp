var jwt = require("jsonwebtoken");
const globalchanel = require("../app/models/Globalchanel");

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
      if (data.accessToken) {
        jwt.verify(
          data.accessToken,
          `${process.env.JWT_SECRET_KEY}`,
          function (err, decoded) {
            try {
              if (decoded.userName) {
                sendGlobalChanel = {
                  userAvatar: decoded.avatar,
                  userName: decoded.userName,
                  message: data.message,
                };
                console.log(sendGlobalChanel);
                const newGlobalchanel = new globalchanel({
                  message: data.message,
                  user: decoded.userId,
                });
                newGlobalchanel.save(function (err) {
                  if (err) return console.log("mongoDBerr" + err);
                  // saved!
                });
                io.emit("globalChanel", sendGlobalChanel);
              }
            } catch (error) {
              console.log(error);
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
