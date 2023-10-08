import net from "net";

const portNumber = 8081;

const server = net.createServer((socket) => {
  // Get the remote address and port of the connecting client
  const remoteAddress = socket.remoteAddress;
  const remotePort = socket.remotePort;

  console.log(`Client connected from ${remoteAddress}:${remotePort}`);

  // code
  socket.on("data", (data) => {
    const stringData = data.toString();

    console.log(`Received: ${stringData}`);
  });

  // On close
  socket.on("close", () => {
    console.log(`Client disconnected from ${remoteAddress}:${remotePort}`);
  });
});

server.listen(portNumber);
console.log(`Listening on port ${portNumber}`);
