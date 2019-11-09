const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const messages = require('./messageQueue')




// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  console.log(queue);
  messageQueue = queue;
};
module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if ((req.method === 'GET') || (req.url === "/background.jpg") || (req.url === 'http://127.0.0.1:3000')) {

    res.writeHead(200, headers);
    res.end(messages.dequeue());

  } else if(req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if ((req.method === 'GET') && (req.url === "/")) {
    res.writeHead(404, headers);
    res.end();
  }
  next();
  // invoke next() at the end of a request to help with testing!
}
// var randomCommandGenerator = function() {
//   var commands = ['up', 'down', 'left', 'right'];
//   var index = Math.floor(Math.random() * commands.length);
//   return commands[index];
