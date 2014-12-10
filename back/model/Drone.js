/*-------------------------------------------------*\
				DRONE.JS

	Description : 

	Remote control of Drone Device with ardrone-aut
	onomy library.

\*-------------------------------------------------*/


/* var arDrone = require('ar-drone');
var dronev1 = arDrone.createClient(); */
var autonomy = require('ardrone-autonomy');
var drone = autonomy.createMission();


function Drone(heightMax) {
	var heightMax, currentHeight;
	var self = this;
	var plan = null;
	if(heightMax === undefined){
		heightMax = 180;
	}
	setHeightMax = heightMax;
	/* dronev1.after(2000, function(){
			console.log('Initialisation');
			this.animateLeds('blinkGreenRed',5,5); // Leds blinking		
		});
*/
	eventEmitter.emit('drone_init');
}

Drone.prototype.setPlan = function (plan) {
	if( plan === undefined ){
		console.log('Plan cannot be found.')
	}else {
		this.plan = plan;
	}
}

// - Action Array Analysis and post-action treatment

Drone.prototype.execute = function (plan){
	if( plan !== undefined) {
		this.plan = plan;
}	
	var actionList=this.plan.getFlyActionList();

	for (var index = 0; index < actionList.lenght; index++) {
		switch(actionList[index].type){
			case ETypeAction_file.ETypeAction.Move : 				
				switch(actionList[index].direction){
					case EDirection_file.EDirection.Forward :
					drone.forward( actionList[index].value );
					break;

				case EDirection_file.EDirection.Backward :
					drone.backward( actionList[index].value );
					break;

				case EDirection_file.EDirection.Left :
					drone.left( actionList[index].value );
					break;

				case EDirection_file.EDirection.Right :
					drone.right( actionList[index].value );
					break;

				case EDirection_file.EDirection.Up :
					if( ( currentHeight + actionList[index].value ) < getHeightMax){
					drone.up( actionList[index].value );
					}
					break;

				case EDirection_file.EDirection.Down :
					drone.down( actionList[index].value );
					break;

				default: 
					console.log("La direction n'existe par pour l'action "+index);
			} // End Switch
			break;

		case ETypeAction_file.ETypeAction.Rotate :	
				switch(actionList[index].direction){

					case EDirection_file.EDirection.Left :
						drone.cw(actionList[index].value);
						break;

					case EDirection_file.EDirection.Right :
						drone.ccw(actionList[index].value);
						break;
						
					default: 
						console.log("La direction n'existe par pour l'action "+index);
				}	
			break;

		default: 
			console.log("Erreur de traitement de l'action"+index);
	}
	eventEmitter.emit('drone.action');
	}
}

// - Fly order
Drone.prototype.startFlight = function(){
	drone.takeoff();
	currentHeight=1;
	/*
	dronev1
		.after(2000, function(){
			this.animateLeds('green',5,5);		
		});
	*/
	
	eventEmitter.emit('drone_start');
}

// - Land order
Drone.prototype.stopFlight = function (){
	drone.land();		
	eventEmitter.emit('drone_stop');
}

// - Height getter
Drone.prototype.getHeightMax = function(){
	return heightMax;
}

// - Height setter
Drone.prototype.setHeightMax = function(height){
	heightMax=height;
}

