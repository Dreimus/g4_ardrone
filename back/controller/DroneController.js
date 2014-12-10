/*-------------------------------------------------*\
				DRONECONTROLLER.JS

	Description : 

	Create a controller interacting between server and
	drone model.

\*-------------------------------------------------*/

// - INCLUDES
var server = require('./Server');
var drone = require('../model/Drone');
var stop = require('../model/EmergencyStop');
// - END INCLUDES

function DroneController() {
	var self = this;
	// - Event handler from Client -
	eventEmitter.on('client_newFlight', this.init);
	eventEmitter.on('client_forceStop', this.forceStop);
	eventEmitter.on('client_plan', this.setPlan);

	// - Event handler from Drone -
	eventEmitter.on('drone_init', function() {console.log(" - DRONE INITIALIZED ")});
	eventEmitter.on('drone_action', function() {console.log(" - ACTION STARTED ")});
	eventEmitter.on('drone_start', function() {console.log(" - A DRONE IS FLYING ")});
	eventEmitter.on('drone_stop', function() {console.log(" - A DRONE FLEW ")});
	eventEmitter.on('drone_stopEmergency', function() {console.log(" - EMERGENCY : DRONE STOPPED ")});
}

// - Flight initialization
DroneController.prototype.init = function ( maxHeight ){ 
	drone = new Drone(maxHeight);
}

// - Stop request in case of emergency
DroneController.prototype.forceStop = function(){stop.emergencyStop(); }

// - Plan transmission to Drone model
DroneController.prototype.setPlan = function( givenPlan ){ 
	if( givenPlan === undefined ){
		throw new "ERR - Cannot find Plan.";
	}
	drone.setPlan(givenPlan);
}

DroneController.prototype.start = function (){
	drone.startFlight();
	eventEmitter.emit('dc_planExecution');
	drone.execute();
}

DroneController.prototype.stop = function(){
	drone.stopFlight();
}

module.exports = DroneController;