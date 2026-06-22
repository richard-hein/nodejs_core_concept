const net = require("net");

const socket = net.createConnection({ host: "localhost", port: 8050 }, () => {
  const head = Buffer.from(
    "504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a204a6f650d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2037340d0a0d0a",
    "hex"
  );

  const body = Buffer.from(
    "7b227469746c65223a225469746c65206f66206d7920706f7374222c22626f6479223a225468697320697320736f6d65207465787420616e64206d6f726520616e64206d6f72652e227d",
    "hex"
  );

  socket.write(Buffer.concat([head, body]));
});

socket.on("data", (chunk) => {
  console.log("Received Response:");
  console.log(chunk.toString("utf-8"));
  console.log(chunk.toString("hex"));
  socket.end();
});

socket.on("end", () => {
  console.log("Connection closed.");
});

// -----------------
// 0000   50 4f 53 54 20 2f 63 72 65 61 74 65 2d 70 6f 73   POST /create-pos
// 0010   74 20 48 54 54 50 2f 31 2e 31 0d 0a 43 6f 6e 74   t HTTP/1.1..Cont
// 0020   65 6e 74 2d 54 79 70 65 3a 20 61 70 70 6c 69 63   ent-Type: applic
// 0030   61 74 69 6f 6e 2f 6a 73 6f 6e 0d 0a 6e 61 6d 65   ation/json..name
// 0040   3a 20 4a 6f 65 0d 0a 48 6f 73 74 3a 20 6c 6f 63   : Joe..Host: loc
// 0050   61 6c 68 6f 73 74 3a 38 30 35 30 0d 0a 43 6f 6e   alhost:8050..Con
// 0060   6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c   nection: keep-al
// 0070   69 76 65 0d 0a 43 6f 6e 74 65 6e 74 2d 4c 65 6e   ive..Content-Len
// 0080   67 74 68 3a 20 37 34 0d 0a 0d 0a                  gth: 74....

// 0000   7b 22 74 69 74 6c 65 22 3a 22 54 69 74 6c 65 20   {"title":"Title
// 0010   6f 66 20 6d 79 20 70 6f 73 74 22 2c 22 62 6f 64   of my post","bod
// 0020   79 22 3a 22 54 68 69 73 20 69 73 20 73 6f 6d 65   y":"This is some
// 0030   20 74 65 78 74 20 61 6e 64 20 6d 6f 72 65 20 61    text and more a
// 0040   6e 64 20 6d 6f 72 65 2e 22 7d                     nd more."}

// 504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a204a6f650d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2037340d0a0d0a
