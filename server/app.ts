const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

import {Server} from 'socket.io';

// Setting up a basic server with cors set to allow anything for testing.
const io = new Server(server, {
    cors : {
        origin: '*'
    }
});

// We're going to open a socket server up and listen for the client.
// When we get a connection lets start an interval that will tell the user step info.
io.on('connection', (socket) => {
    let isDelivery = true;
    let intervalId : NodeJS.Timeout | null = null;
    let steps = 0;

    if(intervalId){
      clearInterval(intervalId)
    };

    socket.on('setOrderType', (type) => {
      isDelivery = type;

      steps = 0;
      if(intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(()=>{
        switch(steps) {
              case 0:
                socket.emit('steps', 'Your order is being prepared.');
                break;
              case 1:
                socket.emit('steps', 'Your order is being baked.');
                break;
              case 2:
                socket.emit('steps', 'Your order is being inspected.');
                break;
              case 3:
                if(isDelivery){
                  socket.emit('steps', 'Your order is out for delivery.');
                } else {
                  socket.emit('steps', 'Your order is ready.');
                  socket.emit('done');
                  steps = 0;
                  if(intervalId) {
                    clearInterval(intervalId);
                  }
                }
                break;
              case 4:
                socket.emit('steps', 'Your order has been delivered.');
                socket.emit('done');
                steps = 0;
                if(intervalId) {
                    clearInterval(intervalId);
                }
                break;
          }
    
          steps++;
      }, 4000);
    });
});

server.listen(3001, () => {
    console.log('Server started!');
});