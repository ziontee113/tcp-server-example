import net from "net";

const portNumber = 8081;

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const stringData = data.toString();

    console.log(`Received: ${stringData}`);
  });
});

server.listen(portNumber);
console.log(`Listening on port ${portNumber}`);
