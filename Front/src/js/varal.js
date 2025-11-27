const socket = io("http://localhost:3000");

function sendBlind(cmd) {
  socket.emit("blind-control", cmd);
}
