import app from "./src/app.js"
import {createServer }from "node:http"
import initializeSocket from "./src/sockets/socket.server.js"

const httpServer = createServer(app)
initializeSocket(httpServer)

httpServer.listen(3000,()=>{
  console.log("Server running on 3000");
})