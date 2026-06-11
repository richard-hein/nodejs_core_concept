// ***** Promise Api ***** //
const fs = require("fs/promises");

(async () => {
  try {
    await fs.copyFile("text.txt", "copied-promise.txt");
  } catch (error) {
    console.log(error);
  }
})();

// ***** Callback Api ***** //
// const fs = require("fs");

// fs.copyFile("text.txt", "copied-callback.txt", (error) => {
//   if (error) console.log(error);
// });

// ***** Synchronous Api ***** //
// const fs = require("fs");

// fs.copyFileSync("text.txt", "copied-callback.txt", (error) => {
//   if (error) console.log(error);
// });
