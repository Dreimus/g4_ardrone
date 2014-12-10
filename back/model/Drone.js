/*-------------------------------------------------*\
				DRONE.JS

	Description : 

	Remote control of Drone Device with ardrone-aut
	onomy library.

\*-------------------------------------------------*/


var arDrone = require('ar-drone');
var drone = arDrone.createClient(); /*
var autonomy = require('ardrone-autonomy');
var drone = autonomy.createMission(); */


function Drone(heightMax) {
	var heightMax, currentHeight;
	var self = this;
	var plan = undefined;
	console.log(' DEBUG - Drone_const');
	if(heightMax === undefined){
		heightMax = 180;
	}
	setHeightMax = heightMax; /*
	drone.after(2000, function(){
			console.log('Initialisation');
			this.animateLeds('blinkGreenRed',5,5); // Leds blinking
		});*/
	eventEmitter.emit('drone_init');
}

Drone.prototype.setPlan = function (plan) {

	if( plan === undefined ){
		console.log('Plan cannot be found.')
	}else {
		this.plan = plan;
	}

	
	console.log(this.plan);
}

// - Action Array Analysis and post-action treatment

Drone.prototype.execute = function (plan){

	if( plan !== undefined) {
		this.plan = plan;
	}	
	
	var actionList=this.plan.getFlyActionList();
	console.log(this.plan);
	
	for (var index = 0; index < actionList.length; index++) {
		
		switch(actionList[index].type){
			case ETypeAction_file.ETypeAction.Move : 				
				switch(actionList[index].direction){
					case EDirection_file.EDirection.Forward :
					drone.after(2000, function(){
						console.log(actionList[index].value);
						this.front(  (actionList[index].value / 100 ) );
					});
					break;

				case EDirection_file.EDirection.Backward :
					drone.after(2000, function (){
						this.front(  (actionList[index].value / 100 ) );
					});
					break;

				case EDirection_file.EDirection.Left :
					drone.after(6000, function (){
						this.counterClockwise(0.2);
						this.front(  (actionList[index].value / 100 ) );
					});
					break;

				case EDirection_file.EDirection.Right :
					drone.after(6000, function (){
						this.clockwise(0.2);
						this.front(  (actionList[index].value / 100 ) );
					});
					break;

				case EDirection_file.EDirection.Up :
					if( ( this.currentHeight + actionList[index].value ) < this.getMaxHeight){
						drone.after(2000, function() {
							this.up(  (actionList[index].value / 100 ) );
						});
					}
					break;

				case EDirection_file.EDirection.Down :
					drone.after(2000, function() {
						this.down(  (actionList[index].value / 100 ) );
					});
					break;

				default: 
					console.log("La direction n'existe par pour l'action "+index);
			} // End Switch
			break;

		case ETypeAction_file.ETypeAction.Rotate :	
				switch(actionList[index].direction){

					case EDirection_file.EDirection.Left :
						drone.after(2000, function() {
							this.clockwise( (actionList[index].value / 100 ));
						});
						break;

					case EDirection_file.EDirection.Right :
						drone.after(2000, function() {
							this.counterClockwise( (actionList[index].value / 100 ));
						});
						break;
						
					default: 
						console.log("La direction n'existe par pour l'action "+index);
				}	
			break;

		default: 
			console.log("Erreur de traitement de l'action"+index);
		}
	eventEmitter.emit('drone_action');
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
	drone.stop();
	drone.land();	
	eventEmitter.emit('drone_stop');
}

// - Height getter
Drone.prototype.getMaxHeight = function(){
	return heightMax;
}

// - Height setter
Drone.prototype.setMaxHeight = function(height){
	heightMax=height;
}

module.exports = Drone;
