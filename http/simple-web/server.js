const Butter = require("../butter");

const PORT = 8000;

const server = new Butter();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
