const cpeak = require("cpeak");

const PORT = 5050;

const server = new cpeak();

server.route("get", "/", (req, res) => {
  res.json({ message: "This is some text" });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
