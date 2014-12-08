var low = require('lowdb'),
  db = low("../../db/db.json"),
  express = require('express'),
  app = express(),
  port = 13000,
  server = app.listen(port),
  io = require('socket.io').listen(server),
  events = require('events'),
  eventEmitter = new events.EventEmitter(),
  path = require("path"),
  rootPath = __dirname + "/../../",
  frontPath = rootPath + "front/";


// Route(s) settings

// Default application root
app.get('/', function(req, res){
  res.sendFile(path.resolve(frontPath + 'view/index.html'));
});

// Route for loading Client.js
app.get('/assets/js/Client.js', function(req, res){
  res.sendFile(path.resolve(frontPath + 'assets/js/Client.js'));
});

console.log("Serveur démarrer sur le port : " + port);
console.log(" Front path : " + frontPath);