const fs = require("fs/promises");

(async () => {
  const CREATE_FILE = "create the file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  // create file
  const createFile = async (filePath) => {
    let existingFileHandle;
    try {
      // check whether or not we have file.
      existingFileHandle = await fs.open(filePath, "r");
      return console.log(`The file ${filePath} is already exists.`);
      existingFileHandle.close();
    } catch (error) {
      // we don't have a file , now we should create it.
      const newFileHandle = await fs.open(filePath, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };

  // delete file
  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath);
      console.log("The file was successfully removed.");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("No file at this path to remove.");
      } else {
        console.log("An error occurred while removing the file");
        console.log(error);
      }
    }
  };

  // rename file
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log("The file was successfully renamed.");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No file at this path to rename or destination doesn't exist.",
        );
      } else {
        console.log("An error occurred while removing the file");
        console.log(error);
      }
    }
  };

  let addedContent;
  // add to file
  const addToFile = async (path, content) => {
    if (addedContent == content) return;
    try {
      const fileHandle = fs.open(path, "a");
      (await fileHandle).write(content);
      addedContent = content;
      console.log("Added content successfully");
    } catch (error) {
      console.log("An error occurred while adding to file ");
      console.log(error);
    }
  };

  // in order to do file operation we need to open file first ( the same logic to all programming languages)
  // r -> read
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // get the size of our file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling our buffer
    const offset = 0;
    // how many bytes that we want to read
    const length = buff.byteLength;
    // how many bytes that we want to start reading the file from
    const position = 0;

    // we always want to read the whole content ( from beginning always to the end)
    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf8");

    // create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file
    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file
    // rename a file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");

      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    // add to file
    // add to the file <> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.includes(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addToFile(filePath, content);
    }
  });

  // watcher
  const watcher = fs.watch("./command.txt");

  // async iterator
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
