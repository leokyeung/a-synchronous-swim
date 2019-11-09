const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const message = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let message = ["left", "right", "up", "down"]

  res.writeHead(200, headers);

  res.end(message[getRandomInt(4)]);
  next(); // invoke next() at the end of a request to help with testing!
};         