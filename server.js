const express = require("express");
const path = require("path");
const server = express();

server.set("port", 3000);

server.use(express.static(path.join(__dirname, "public")));

// server.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname + "/public/index.html"));
// });

server.get("/index.bundle.js", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.bundle.js"));
});
server.get("/index.bundle.js.map", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.bundle.js.map"));
});

server.listen(server.get("port"), () => {
  console.log("http://localhost:" + server.get("port"));
});
