const net = require("node:net");

// create TCP server
const server = net.createServer((socket) => {
  // data is buffer data
  socket.on("data", (data) => {
    console.log(data);
  });
});

server.listen(3099, "127.0.0.1", () => {
  console.log("opened server on ", server.address());
});
