/*-------------------------------------------------*\
                      SERVER.JS

  Description : 

  This file create the interaction between 
  website remote control and the device's
  Controller.

\*-------------------------------------------------*/
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
global.events = require('events');
global.eventEmitter = new events.EventEmitter();


global.DroneController = require(rootPath + 'back/controller/DroneController');
global.Drone = require(rootPath + 'back/model/Drone');

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
  console.log(" - New connexion registered");
});

var p = new Plan("Plan4");
p.savePlan();
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 10));
p.savePlan();
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 20));
p.savePlan();
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotation, EDirection_file.EDirection.Forward, 20));
p.savePlan();

// --

var actionList = new Array();

var test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 10);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Left, 10);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Right, 10);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Up, 50);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Down, 50);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Rotate, EDirection_file.EDirection.Left, 100);
actionList[actionList.length] = test;
test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Backward, 10);
actionList[actionList.length] = test;

plan = new Plan('Try1', actionList);

var dc = new DroneController();
dc.init(130);
dc.setPlan(plan);
dc.start();
dc.stop();

// Some logging for informations
console.log(" - Server started on port " + port);
console.log(" - Front path : " + frontPath);

