const express = require("express");
const path = require("path");
const server = express();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
// writeToDisk: true
server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  writeToDisk: true
  // 웹펙데브를 실행할때 메모리에 번들에서 파일이 안생기는데 옵션으로 생성하라고 지정해준것.
}))

server.set("port", 3000);

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

server.listen(server.get("port"), () => {
  console.log("http://localhost:" + server.get("port"));
});