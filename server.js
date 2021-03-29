const express = require("express");
const path = require("path");
const server = express();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

server.set("port", 3000);

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

server.listen(server.get("port"), () => {
  console.log("http://localhost:" + server.get("port"));
});