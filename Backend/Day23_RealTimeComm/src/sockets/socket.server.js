import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  //   this is an "connection" event and it runs whenever a user/client is connected to the server, if somehow user disconnects due to internet problem then a new connection is then made, old ones is old now, remember on every new connection it defines a new connection which is  throguh differentiated socket Id
  io.on("connection", (socket) => {
    console.log("A user is connected",socket.id);

    socket.on("disconnect", () => {
      console.log("A user is disconnected",socket.id);
    });
  });
}

/*
Imp Rule:- If frontend fires a Event so it is listend by backend and if backend fires a event it is heard by frontend.
Imp Words in Socket.io:
  (i) emit:- event ko fire krna.
  (ii) on:- event listen krna. 
 */