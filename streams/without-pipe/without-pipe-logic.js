readStream.on("data", (chunk) => {
  const canContinue = writeStream.write(chunk);
  if (!canContinue) {
    readStream.pause(); // backpressure: slow down!
  }
});

writeStream.on("drain", () => {
  readStream.resume(); // writeStream caught up, resume reading
});

readStream.on("end", () => {
  writeStream.end(); // close the destination file
});
