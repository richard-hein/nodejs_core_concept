const { Buffer, constants } = require("buffer");

// const b = Buffer.alloc(1e9); // 1,000,000,000 bytes (1 GB)
const b = Buffer.alloc(0.5e9); // 500 MB

console.log(constants.MAX_LENGTH);
setInterval(() => {
  for (let i = 0; i < b.length; i++) {
    b[i] = 0x22;
  }
}, 5000);
