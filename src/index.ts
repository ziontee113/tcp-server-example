import net from "net";

const portNumber = 8081;

const server = net.createServer((socket) => {
  // On connect
  const remoteAddress = socket.remoteAddress;
  const remotePort = socket.remotePort;

  console.log(`Client connected from ${remoteAddress}:${remotePort}`);

  // On data
  socket.on("data", (data) => {
    const stringData = data.toString();
    const parsedData = JSON.parse(stringData);

    if (parsedData.type === "connection-request-from-lua") {
      handleIncomingConnectionFromNeovim(
        `${remoteAddress}:${remotePort}`,
        parsedData.port
      );
    }

    console.log(`Received: ${stringData}`);
  });

  // On close
  socket.on("close", () => {
    handleClosingConnectionFromNeovim(`${remoteAddress}:${remotePort}`);
    console.log(`Client disconnected from ${remoteAddress}:${remotePort}`);
  });
});

server.listen(portNumber);
console.log(`Listening on port ${portNumber}`);

// ========================================================

let activeNeovimPort: null | number = null;
let sockets: { [key: string]: net.Socket } = {};

function handleIncomingConnectionFromNeovim(key: string, port: number) {
  activeNeovimPort = port;

  if (!sockets[activeNeovimPort]) {
    const newSocket = new net.Socket();
    newSocket.connect(8081, "0.0.0.0", () => {
      // TODO: callback
    });
    sockets[key] = newSocket;
  }

  console.log(Object.keys(sockets));
}

function handleClosingConnectionFromNeovim(key: string) {
  delete sockets[key];
  console.log(Object.keys(sockets));
}
