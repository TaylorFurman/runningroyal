const hostname = '127.0.0.1';
const port = 3700;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//Connect to database & save data to json file for front end to use for prop/state management
const pgp = require('pg-promise')();
const axios = require('axios');
const {dirname} = require('path');

//var DATABASE_ID = 'yayzkssa';
//var DATABASE_PASSWORD = 'Uw9I3snTPe8dTY307iJO_1MTGmZwm_nA';
//var DATABASE_HOST = 'chunee.db.elephantsql.com';
//var DATABASE_USER = 'yayzkssa';

 const dbsettings = process.env.DATABASE_URL || pgp({
   database: 'yayzkssa',
   password: 'Uw9I3snTPe8dTY307iJO_1MTGmZwm_nA',
   host: 'chunee.db.elephantsql.com',
   user: 'yayzkssa'
 })
 const db = (dbsettings);



//socket io
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});