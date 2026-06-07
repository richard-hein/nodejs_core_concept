const { Buffer } = require("buffer");

/**
const memoryContainer = Buffer.alloc(4); // create a buffer of 4 bytes (32 bits) initialized with zeros

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
memoryContainer[2] = 0xb6;
// memoryContainer.writeInt8(-34, 2); // write min value in 8 bit
memoryContainer[3] = 0xff;

const bufferElementByIndex = memoryContainer[0]; // access memory just like an array

console.log(bufferElementByIndex);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
// console.log(memoryContainer.readInt8(2)); // read 8 bit signed integer at index 2
console.log(memoryContainer[3]);
console.log(memoryContainer);

console.log(memoryContainer.toString("hex")); // print buffer as hexadecimal string
// min value in decimal is 0 and max value is 255 (in 8 bit)

 */

/** 
const buff = Buffer.from([0x48, 0x69, 0x21]);

console.log(buff.toString("utf8"));
*/

/**
 * const buff = Buffer.from("486921", "hex");
 * console.log(buff.toString("utf8"));

 */

const buff = Buffer.from(
  "E18095E180BCE1808AE180B7E180BAE18085E180AFE180B6E1809FE180ADE18094E180BAE180B8",
  "hex",
);
console.log(buff.toString("utf-8"));

// const buff = Buffer.from("E18095", "hex");
// console.log(buff.toString("utf-8"));
