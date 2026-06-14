const { resolve } = require("node:dns");
const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

// client -> stream
const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 3000,
  },
  async () => {
    console.log("connected to server");

    const ask = async () => {
      const message = await rl.question("Enter a message >");
      // move the cursor one line up
      await moveCursor(0, -1);
      // clear the current line that the cursor is in
      await clearLine(0);
      socket.write(`${id}-message-${message}`);
    };

    // ask();

    socket.on("data", async (data) => {
      if (data.toString("utf8").substring(0, 2) === "id") {
        //   when we are getting the id...

        id = data.toString("utf8").substring(3);
        console.log(`Your id is ${id}!\n`);
      } else {
        //   when we are getting the message...
        // log an empty line
        console.log();
        await moveCursor(0, -1);
        await clearLine(0);

        console.log(data.toString("utf-8"));
      }

      ask();
    });
  },
);

// stream closed
socket.on("close", () => {});

// stream ended
socket.on("end", () => {});
