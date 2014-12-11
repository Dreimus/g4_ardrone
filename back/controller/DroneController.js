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
	this.actionList = undefined;
	this.actionCount = -1; // We add +1 beafore each nextAction
	this.plan = undefined;

	// - Event handler from Client -
	eventEmitter.on('client_newFlight', this.init);
	eventEmitter.on('client_forceStop', this.forceStop);
	eventEmitter.on('client_plan', this.setPlan);

	// - Event handler from Drone -
	eventEmitter.on('drone_init', function() {
		console.log(" - DRONE INITIALIZED ");
	});
	eventEmitter.on('drone_action', function() {
		self.nextAction();
	});
	eventEmitter.on('drone_start', function() {
		console.log(" - DRONE IS FLYING ");
		self.nextAction();
	});
	eventEmitter.on('drone_stop', function() {
		console.log(" - DRONE IS LANDING ");
	});
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
	this.plan = givenPlan;
	this.actionList = this.plan.getFlyActionList();
}

DroneController.prototype.start = function (){
	drone.startFlight();
}


DroneController.prototype.stop = function(){
	drone.stopFlight();
}

DroneController.prototype.nextAction = function(){
	this.actionCount+=1;
	if ( (this.actionCount) >= this.actionList.length ){
		drone.stopFlight();
	} else {
		console.log(' - PERFORMING ACTION N°'+this.actionCount+'...');
		drone.execute(this.actionList[this.actionCount]);
	}
}

module.exports = DroneController;