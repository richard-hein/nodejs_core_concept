const cluster = require("node:cluster");

if (cluster.isPrimary) {
  let requestCount = 0;
  setInterval(() => {
    console.log("Total number of request : ", requestCount);
  }, 5000);

  console.log(`This is the parent with PID ${process.pid}`);
  // get CPU core count
  const coreCount = require("node:os").availableParallelism();

  for (let i = 0; i < coreCount; i++) {
    // and fork()
    const worker = cluster.fork();
    // send data to another process
    worker.send("some data");
    console.log(
      `The parent process spawned a new child process with PID ${worker.process.pid}`,
    );
  }

  cluster.on("message", (worker, message) => {
    if (message.action && message.action === "request") {
      requestCount++;
    }
  });

  cluster.on("fork", (worker) => {});

  cluster.on("listening", (worker, address) => {});

  cluster.on("exit", (worker, code, signal) => {
    // if worker process is died , the new process spawn for it
    console.log(
      `Worker ${worker.process.pid} ${signal || code} died. Restarting...`,
    );
    cluster.fork();
  });
} else {
  // console.log("This is the child process");
  require("./server.js");
}
