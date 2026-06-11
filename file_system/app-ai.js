const fs = require("fs/promises");

(async () => {
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  // 1. Create file operation
  const createFile = async (filePath) => {
    let existingFileHandle;
    try {
      // Check whether or not we have the file.
      existingFileHandle = await fs.open(filePath, "r");
      await existingFileHandle.close(); // Always close the handle
      console.log(`The file ${filePath} already exists.`);
    } catch (error) {
      // If fs.open throws an error, the file doesn't exist, so create it.
      try {
        const newFileHandle = await fs.open(filePath, "w");
        console.log("A new file was successfully created.");
        await newFileHandle.close();
      } catch (writeError) {
        console.error(`Failed to create file: ${writeError.message}`);
      }
    }
  };

  // 2. Delete file operation
  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath); // Actual file deletion
      console.log(`Deleted file path: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  };

  // 3. Rename file operation
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath); // Actual file rename
      console.log(`Rename ${oldPath} to ${newPath}`);
    } catch (error) {
      console.error(`Error renaming file: ${error.message}`);
    }
  };

  // 4. Add to file operation
  const addToFile = async (path, content) => {
    try {
      await fs.appendFile(path, content); // Actual write/append operation
      console.log(`Adding to ${path}`);
      console.log(`Content: ${content}`);
    } catch (error) {
      console.error(`Error writing to file: ${error.message}`);
    }
  };

  // Open the command file to read instructions from
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // Get the size of our file
    const size = (await commandFileHandler.stat()).size;
    if (size === 0) return; // Skip if file is cleared or empty

    // Allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);

    // Read the whole content from beginning to end
    await commandFileHandler.read(buff, 0, buff.byteLength, 0);

    // Convert to string and trim hidden white spaces/newlines
    const command = buff.toString("utf8").trim();

    // MATCH: Create a file
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1).trim();
      await createFile(filePath);
    }

    // MATCH: Delete a file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1).trim();
      await deleteFile(filePath);
    }

    // MATCH: Rename a file
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      if (_idx !== -1) {
        const oldFilePath = command
          .substring(RENAME_FILE.length + 1, _idx)
          .trim();
        const newFilePath = command.substring(_idx + 4).trim();
        await renameFile(oldFilePath, newFilePath);
      }
    }

    // MATCH: Add to file
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: "); // Fixed from .includes()
      if (_idx !== -1) {
        const filePath = command.substring(ADD_TO_FILE.length + 1, _idx).trim();
        const content = command.substring(_idx + 15).trim();
        await addToFile(filePath, content);
      }
    }
  });

  // Watcher configuration
  const watcher = fs.watch("./command.txt");

  // Async iterator tracking the watcher events
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
