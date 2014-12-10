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
global.jade = require('jade');
global.mustache = require('mustache');
global.fs = require('fs');

global.events = require('events'),
global.eventEmitter = new events.EventEmitter(),

global.Enum = require('enum');
global.ETypeAction_file = require(rootPath + "common/enum/ETypeAction.js");
global.EDirection_file = require(rootPath + "common/enum/EDirection.js");

// Return the content of a File encoded in "utf-8"
global.customReadFile = function(filename) {return fs.readFileSync(filename, "utf-8")};
// Render with mustache a file, with the @data options
global.mstRender = function(filename, data) { return mustache.render(customReadFile(rootPath + filename), data)};

/******************************************/  
// End Global Import
/******************************************/

// Route(s) settings

// Default application root
app.get('/', function(req, res){
  //res.sendFile(mustache.render);
  res.sendFile(path.resolve(frontPath + 'view/index.mst.html'));
});

// Route for loading Client.js
app.get('/assets/js/Client.js', function(req, res){
  res.sendFile(path.resolve(frontPath + 'assets/js/Client.js'));
});

app.get('/view/partials/createPlanForm', function(req, res){
  // res.send(jade.renderFile(frontPath + '/view/partials/_createPlanForm.jade'), {pageData: {name : ['name 1', 'name 2']}});
  //  res.send(mustache.render(customReadFile(frontPath + 'front/view/partials/_createPlanForm.mst'),
  // {data: ETypeAction_file.ETypeAction.enums, data2: EDirection_file.EDirection.enums}));
  res.send(mstRender("front/view/partials/_createPlanForm.mst",
    {data: ETypeAction_file.ETypeAction.enums, data2: EDirection_file.EDirection.enums}));
});

// Sockets management
io.sockets.on('connection', function (socket){
  console.log("coucou new connexion");
});

var p = new Plan("Plan4");
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 10));
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 20));
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotation, EDirection_file.EDirection.Forward, 20));

console.log(p.getFlyActionList()[0].type);

// p.name = "truc";
// p.savePlan();

//console.log("Exist : " + Plan.exist("Plan4"));
// console.log(p);
//
// console.log(p);
//
// console.log(EDirection_file.EDirection.enums);
//

// var view = {
//   title: "Joe",
//   calc: function () {
//     return 2 + 4;
//  }
// };
// console.log(customReadFile(frontPath + 'view/partials/_createPlanForm.mst'));


// Some logging for informations
console.log("Serveur démarrer sur le port : " + port);
console.log(" Front path : " + frontPath);