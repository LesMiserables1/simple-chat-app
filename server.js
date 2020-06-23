const WebSocket = require('ws');
const express = require('express');

let user = []
let msg = []

const wss = new WebSocket.Server({
  port: 5000,
  perMessageDeflate: false
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        let data = JSON.parse(message)
        let req_data
        if(data.msg){
          msg.push(data)
          req_data = JSON.stringify({
            user : 0,
            data : msg
          })
        }else{

          let flag = 1
          user.forEach(e => {
            console.log(e)
            if(e == data.name) flag = 0
          });
          if(flag) user.push(data.name)
          req_data = JSON.stringify({
            user : 1,
            data : user
          })
          
        }
        client.send(req_data)
      }
    });
  });
});


