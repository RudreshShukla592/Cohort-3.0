import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  //   this is an "connection" event and it runs whenever a user/client is connected to the server, if somehow user disconnects due to internet problem then a new connection is then made, old ones is old now, remember on every new connection it defines a new connection which is  throguh differentiated socket Id
  io.on("connection", (socket) => {
    console.log("A user is connected",socket.id);

    socket.on("elon",(msg)=>{
       console.log("elon event:-", msg);
       io.emit("musk")
    })

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
In Socket.io there are only 2 build in events(connection, disconnect) other than that are all custom event made by developers

here there are 2 diff. custom event:- "elon" & "musk"
io.emit():- jitne user server se connected hai sabke pass uss event to fire kro
socket.emit():- jiss user ne event ko fire kra hai shirf uss user ke pass ye wala event emit kro 
socket.broadcast.emit():- reverse of socket.emit(), jiss user ne event ko fire kiya hoga usko chor ke sabke pass ye wala event emit hota hai
 */