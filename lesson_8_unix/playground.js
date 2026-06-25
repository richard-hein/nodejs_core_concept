const { spawn, exec } = require("node:child_process");
const { stdin, stdout, stderr } = require("node:process");

// ** Standard In, Standard Out, Standard Error  **//
// stdin.on("data", (data) => {
//   // console.log("Stdin Data : ", data.toString("utf-8"));
//   stdout.write(`Got this data from standard in: ${data.toString("utf-8")}\n`);
// });
// stdout.write("This is some text that I want.");
// stderr.write("This is some text I may not want");

// const subprocess = spawn("echo", ["something", "|", "tr", " ", "\n"]);

// console.log(process.env.PATH);
// console.log(process.argv);
// console.log(process.pid);
// console.log(process.ppid);

// ** Environment Variables  **//
// console.log(process.env);
// console.log(process.env.MODE);
// console.log(process.env.PATH)
// console.log(process.env.PWD);

// ** Spawning a process  **//
// subprocess -> child process
const subprocess = spawn(
  "./playground",
  ["some string", "-f", 34, "some more string", "-u"],
  {
    env: { MODE: "development" },
  },
);

subprocess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

subprocess.stderr.on("data", (data) => {
  console.log("Got this stderr from the C app: ", data.toString("utf-8"));
});

subprocess.stdin.write("Some text that is coming from Node!");
subprocess.stdin.end();
// // ls -l (linux command)
// exec("ls -l", (error, stdout, stderr) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log(stdout);

//   console.log(`stderr: ${stderr}`);
// });
