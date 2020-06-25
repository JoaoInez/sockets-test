const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
  socket.on("join-room", ({ name, room }) => {
    socket.join(room);
    // Welcome current user
    io.to(room).emit("receive-message", `Welcome ${name}!`);

    // Broadcast when a user connects
    io.to(room).emit("receive-message", `${name} has joined the chat`);

    // // Send users and room info
    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getRoomUsers(user.room),
    // });
  });
  socket.on("send-message", ({ msg, room }) => {
    io.to(room).emit("receive-message", msg);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
