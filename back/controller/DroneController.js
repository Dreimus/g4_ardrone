/*-------------------------------------------------*\
				DRONECONTROLLER.JS

	Description : 

	Create a controller interacting between server and
	drone model.

\*-------------------------------------------------*/

// - INCLUDES
var server = require('./Server.js');
var drone = require('./Drone.js');
var stop = require('./EmergencyStop.js');
// - END INCLUDES

// - Flight initialization
function init( maxHeight ){ drone.init(maxHeight); }

// - Stop request in case of emergency
function forceStop(){stop.emergencyStop(); }

// - Plan transmission to Drone model
function setPlan( givenPlan ){ 
	if( givenPlan === undefined ){
		throw new "ERR - Cannot find Plan.";
	}
	drone.setPlan(givenPlan);
	eventEmitter.emit('dc_planExecution');
}

// - Event handler from Client -
eventEmitter.on('client_newFlight', init( maxHeight ));
eventEmitter.on('client_forceStop', forceStop());
eventEmitter.on('client_plan', setPlan( givenPlan ));

// - Event handler from Drone -
eventEmitter.on('drone_init', console.log(" - DRONE INITIALIZED "));
eventEmitter.on('drone_action', console.log(" - ACTION STARTED "));
eventEmitter.on('drone_start', console.log(" - A DRONE IS FLYING "));
eventEmitter.on('drone_stop', console.log(" - A DRONE FLEW "));
eventEmitter.on('drone_stopEmergency', console.log(" - EMERGENCY : DRONE STOPPED "));