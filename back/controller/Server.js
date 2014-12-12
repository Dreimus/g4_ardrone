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
global.mustache = require('mustache');
global.fs = require('fs');

global.events = require('events'),
global.eventEmitter = new events.EventEmitter(),


global.DroneController = require(rootPath + 'back/controller/DroneController');
global.Drone = require(rootPath + 'back/model/Drone');

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

// Assets
app.use('/assets', express.static(frontPath + 'assets/'));

// Partials
app.get('/partials/tableStructure', function(req, res){
  res.send(mstRender("front/view/partials/planForm/_tableStructure.mst"));
});

app.get('/partials/lineToRepeat', function(req, res){
  res.send(mstRender("front/view/partials/planForm/_lineToRepeat.mst",
    { EnumType: ETypeAction_file.ETypeAction.enums, EnumDirection: EDirection_file.EDirection.enums }));
});

// app.get('/partials/lineToRepeat', function(req, res){
//   res.send(mstRender("front/view/partials/planForm/_lineToRepeat.mst",
//     {datas: [
//       {
//         data: ETypeAction_file.ETypeAction.enums,
//         data2: EDirection_file.EDirection.enums
//       },
//       {
//         data: ETypeAction_file.ETypeAction.enums,
//         data2: EDirection_file.EDirection.enums
//       }
//     ]}));
// });

app.get('/partials/menu', function(req, res){
  res.send(mstRender("front/view/partials/_menu.mst"));
});

app.get('/partials/flyWatcher', function(req, res){
  res.send(mstRender("front/view/partials/_flyWatcher.mst"));
});

app.get('/partials/title', function(req, res){
  res.send(mstRender("front/view/partials/_title.mst"));
});

// Sockets management
io.sockets.on('connection', function (socket){
  
  // Save the plan into the DataBase
  socket.on("createPlan", function(data){
    
    var dataForm = data.data, 
      plan = new Plan(data.title),
      type = undefined,
      direction = undefined,
      value = undefined;

    for(var i = 0; i < dataForm.length; i++){
      if (i % 3 === 0) {
        type = ETypeAction_file.ETypeAction.get(parseInt(dataForm[i].value)).key;
      } else if (i % 3 === 1) {
        direction = EDirection_file.EDirection.get(parseInt(dataForm[i].value)).key;
      } else if (i % 3 === 2) {
        value = dataForm[i].value;
        plan.addAction(new DroneAction(type, direction, value));
      }
    }
    
    plan.savePlan();    
  });
  
  socket.on("droneStart", function() {
    
  });
  
});

// Some logging for informations
console.log(" - Server started on port " + port);
console.log(" - Front path : " + frontPath);

// --------------------- MAIN TRIES --------------------------
var p = new Plan("Plan4");
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Forward.key, 30));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Backward.key, 5));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Up.key, 0.2));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Down.key, 4));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Left.key, 5));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Move.key, EDirection_file.EDirection.Right.key, 6));
// p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotate.key, EDirection_file.EDirection.Right.key, 8));
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotate.key, EDirection_file.EDirection.Left.key, 40));
p.addAction(new DroneAction(ETypeAction_file.ETypeAction.Rotate.key, EDirection_file.EDirection.Right.key, 40));

// --

var dc = new DroneController();
dc.init(130);
dc.setPlan(p);
dc.start();


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