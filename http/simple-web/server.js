const http = require("node:http");

const server = http.createServer();

server.on("request", (request, response) => {});

server.listen(9000, () => {
  console.log("Web sever is live at http://localhost:9000");
});
