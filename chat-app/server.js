const net = require("node:net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to server!");

  const clientId = clients.length + 1;

  // broadcasting a message to every when someone enter the chat room
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });

  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.map((client) => {
      client.socket.write(`< User ${id}: ${message}`);
    });
  });

  // broadcasting a message to every when someone leaves the chat room
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  socket.on("error", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3000, () => {
  console.log("opened server on", server.address());
});
