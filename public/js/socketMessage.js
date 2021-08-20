let accessToken;
findKey = function (key, str) {
  return str.startsWith(key) || str.startsWith(` ${key}`);
};
try {
  let cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    findKey("accessToken", cookie)
      ? (accessToken = cookie.split("=")[1])
      : accessToken;
  }
} catch (error) {
  console.log(error);
}

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  // either with send()
  socket.send("TokenClient: " + accessToken);
});

// handle the event sent with socket.send()
socket.on("globalChanel", (data) => {
  $(".message-list").prepend(
    `<li class="list-group-item">${data.userName}: ${data.message}</li>`
  );
});
// send message with socket
let messageForm = document.getElementById("messageForm");
let messageBox = document.getElementById("messageBox");
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (messageBox.value) {
    sendData = { accessToken, message: messageBox.value };
    socket.emit("globalChanel", sendData);
    messageBox.value = "";
  }
});
