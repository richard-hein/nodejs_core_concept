const cpeak = require("cpeak");

const PORT = 5050;

const server = new cpeak();

process.on("message", (message) => {
  console.log(`Worker ${process.pid} received this message from parent`);
});

server.route("get", "/", (req, res) => {
  process.send({ action: "request" });
  res.json({ message: "This is some text" });
});

server.route("get", "/heavy", (req, res) => {
  process.send({ action: "request" });
  for (let i = 0; i < 600000000; i++) {}
  res.json({ message: "This is some text" });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
