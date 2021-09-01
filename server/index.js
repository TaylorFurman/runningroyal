const hostname = '127.0.0.1';
const port = 3700;

const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});