const Butter = require("../butter");

const USERS = [
  { id: 1, name: "Liam Brown", username: "liam23", password: "string" },
  { id: 2, name: "Richard Hendrix", username: "richard23", password: "string" },
  { id: 3, name: "John Stwich", username: "joh23", password: "string" },
];

const POSTS = [
  {
    id: 1,
    title: "This is post title",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quasi rerum exercitationem cupiditate itaque quo ipsam alias sunt laudantium, harum sapiente cum id nihil est.",
    userId: 1,
  },
];

const PORT = 9002;

const server = new Butter();

// ------ Files Routes ------- //
server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

// ------ Json Routes ------- //
server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);

    console.log(body, "body");
    const username = body.username;
    const password = body.password;

    const user = USERS.find((user) => user.username === username);
    console.log(user, "user");
    if (user && user.password === password) {
      res.status(200).json({ message: "Logged in successfully!" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    post.author = user.name;
    return post;
  });
  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
