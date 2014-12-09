/*-------------------------------------------------*\
					INDEX.JS

	Description : 

	This file instantate each module and launch
	BackOffice

\*-------------------------------------------------*/

// - INCLUDES - 
var server = require("./controller/Server.js");
var droneController = require("./controller/DroneController.js");
var drone = require ("./model/Drone.js");
// - END INCLUDES -

// - MAIN - 

// Server instantiation
server.start();


//