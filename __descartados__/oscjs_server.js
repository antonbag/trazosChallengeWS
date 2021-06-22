'use strict';
var { Server } = require('node-osc');
const { Client, Message } = require('node-osc');


const client = new Client('10.0.2.16', 3333);

var oscServer = new Server(3333, '127.0.0.1');

oscServer.on('message', function (msg) {
  //console.log(`Message: ${msg}`);
  //oscServer.close();
  
  const message = new Message('/address');
    message.append('testing');
    message.append('testing');
    message.append(123);

    client.send(message, (err) => {
    if (err) {
        console.error(new Error(err));
    }
    
    
    console.log(`recibido: ${msg}`);
    //client.close();
    });
  
});
