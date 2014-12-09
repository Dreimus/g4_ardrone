var express = require('express'),
  app = express(),
  port = 13000,
  server = app.listen(port),
  io = require('socket.io').listen(server),
  path = require("path"),
  rootPath = __dirname + "/../../",
  frontPath = rootPath + "front/",
  Plan = require(rootPath + "common/model/Plan");

// Temporary import 
DroneAction = require(rootPath + "common/model/DroneAction");

/******************************************/
// Load Global module for easy use
// Carefull about loading order. 
// Load dependencies of others files First !
/******************************************/

global.low = require('lowdb');
global.db = low("../../db/db.json");

global.events = require('events'),
global.eventEmitter = new events.EventEmitter(),

global.Enum = require('enum');
global.ETypeAction_file = require(rootPath + "common/enum/ETypeAction.js");
global.EDirection_file = require(rootPath + "common/enum/EDirection.js");

/******************************************/  
// End Global Import
/******************************************/

// Route(s) settings

// Default application root
app.get('/', function(req, res){
  res.sendFile(path.resolve(frontPath + 'view/index.html'));
});

// Route for loading Client.js
app.get('/assets/js/Client.js', function(req, res){
  res.sendFile(path.resolve(frontPath + 'assets/js/Client.js'));
});

// Sockets management
io.sockets.on('connection', function (socket){
  console.log("ocucou new connexion");
});

var p = new Plan("Plan4");
// p.savePlan();
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 10));
// p.savePlan();
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 20));
// p.savePlan();
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotation, EDirection_file.EDirection.Forward, 20));
// p.savePlan();

p.name = "truc";
p.savePlan();

//console.log("Exist : " + Plan.exist("Plan4"));
console.log(p);

console.log(p);

// Some logging for informations
console.log("Serveur démarrer sur le port : " + port);
console.log(" Front path : " + frontPath);
