const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

io = socketio(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // console.log('user connect')
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", (data) => {
    console.log("User disconnected");
  });
});

server.listen(port, () => console.log(`Server is up and running on ${port}`));
