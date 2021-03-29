const express = require('express');
const path = require('path')
const server = express();

server.set('port', 3000);

server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
}); 
server.get('/index.bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.bundle.js'))
})
server.get('/index.bundle.js.map', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.bundle.js.map'))
})

server.listen(server.get('port'), () => {
    console.log(server.get('port'), '번 포트에서 대기 중')
})