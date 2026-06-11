// educational purpose
const { Writable } = require("node:stream");
const fs = require("node:fs");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writeCount = 0;
  }

  // this will run after constructor and it will put off all calling other methods until we call the callback function
  _construct(callback) {
    // fd -> file descriptor
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
    setTimeout(() => {
      callback();
    }, 5000);
  }

  // write() is bad practice don't do it
  _write(chunk, encoding, callback) {
    // console.log(this.fd);
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }

        this.chunks = [];
        this.chunksSize = 0;
        ++this.writeCount;
        callback();
      });
    } else {
      // when we're done we should call the callback function
      callback();
    }
  }

  // final will run after our stream is done
  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

// stream.on("finish", () => {
//   console.log("Stream was finished");
// });

(async () => {
  console.time("writeMany");

  let i = 0;

  const numberOfWrites = 10000000;

  const stream = new FileWriteStream({
    fileName: "text.txt",
  });

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  stream.on("drain", () => {
    // console.log("Drained!!!");
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
  });
})();
