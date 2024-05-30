import express from "express";
//import { Server } from "socket.io";
import dotenv from "dotenv";
import { bootstrap } from "./src/index.router.js";
import { connectDB } from "./DB/connection.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB();
bootstrap(app, express);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);



//emit >send argument
//on >recive callbackfun
// const io = new Server(server, { cors: "*" });
// let sockets = new Set();
// io.on("connection", onConnected);
// function onConnected(socket) {
//   sockets.add(socket.id);

//   io.emit("clients-total", sockets.size);
//   // socket.emit    send to one
//   // io.emit     send to me +all
//   // socket.broadcast.emit   all+ not you

//   socket.on("disconnect", () => {
//     console.log("socket deleted", socket.id);
//     sockets.delete(socket.id);
//     io.emit("clients-total", sockets.size);
//   });
//   socket.on("message", (data) => {
//     socket.broadcast.emit("chatBox-message", data);
//   });
//   socket.on("feedback", (data) => {
//     socket.broadcast.emit("feed", data);
//   });
// }


// var clients = {};

// io.on("connection", (socket) => {
//   console.log("connetetd");
//   console.log(socket.id, "has joined");
//   socket.on("signin", (id) => {
//     console.log(id);
//     clients[id] = socket;
//     console.log(clients);
//   });
//   socket.on("message", (msg) => {
//     console.log(msg);
//     let targetId = msg.targetId;
//     if (clients[targetId]) clients[targetId].emit("message", msg);
//   });
// });