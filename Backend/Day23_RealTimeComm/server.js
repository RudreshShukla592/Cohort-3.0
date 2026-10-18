import app from "./src/app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

// creating an server through instance i.e httpServer wrapped in express
const httpServer = createServer(app);

// socket.io has been configured with our httpServer
const io = new Server(httpServer);

// even connecting our server with socket.io is an event
io.on("connection", (socket) => {
  console.log("A user connected");

  // io:- whole server , socket:- single User 

});

httpServer.listen(3000, () => {
  console.log("Server running on 3000");
});
