require('dotenv').config()
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


var DATABASE_ID = process.env.DATABASE_ID;
var DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
var DATABASE_HOST = process.env.DATABASE_HOST;
var DATABASE_USER = process.env.DATABASE_USER;

 const dbsettings = process.env.DATABASE_URL || ({
   database: DATABASE_ID,
   password: DATABASE_PASSWORD,
   host: DATABASE_HOST,
   user: DATABASE_USER
 })
 const db = pgp(dbsettings);

//socket io
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  db.any('SELECT * FROM run_history')
    .then(run_history_data =>{
      const run_history = JSON.stringify(run_history_data)
      let fs = require("fs");
      fs.writeFile("./src/api/run_history.json", run_history, function(error){
        if (error){
          console.log("error");
        }else{
          console.log("success")
        }
      })
      res.sendFile(__dirname + '/index.html');
   })
});

app.get('./src/api/run_history.json',(req,res)=>{
  console.log(res.data)
    
 })



  
    

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