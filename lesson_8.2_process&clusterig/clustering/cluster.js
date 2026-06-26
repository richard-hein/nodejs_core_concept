const cluster = require("node:cluster");

if (cluster.isPrimary) {
  console.log(`This is the parent with PID ${process.pid}`);
  // get cup core count
  const coreCount = require("node:os").availableParallelism();

  for (let i = 0; i < coreCount; i++) {
    // and fork()
    const worker = cluster.fork();
    console.log(
      `The parent process spawned a new child process with PID ${worker.process.pid}`,
    );
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.id} died. Restarting...`);
      cluster.fork();
    });
  }
} else {
  console.log("This is the child process");
}
