const { Buffer } = require("buffer");

// it's very important to always specify the  buffer with the right one we need
const memoryContainer = Buffer.alloc(3); // 24 bits / 8 = 3 bytes

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
memoryContainer[2] = 0x21;

console.log(memoryContainer); // print buffer as utf8 string

// run through the character encoding
console.log(memoryContainer.toString("utf-8")); // print buffer as utf8 string
