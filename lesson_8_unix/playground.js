const { spawn, exec } = require("node:child_process");
const { stderr } = require("node:process");

// const subprocess = spawn("echo", ["something", "|", "tr", " ", "\n"]);

const subprocess = spawn("ll", ["./scripts.sh"]);

console.log(process.env.PATH);

subprocess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

// ls -l (linux command)
exec("ls -l", (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(stdout);

  console.log(`stderr: ${stderr}`);
});
