const dns = require("node:dns/promises");

// promise version
(async () => {
  const result = await dns.lookup("google.com");
  console.log(result);
})();
