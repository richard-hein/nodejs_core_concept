const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("foo", () => {
  console.log("An Event occurred.");
});

myEmitter.emit("foo");
