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
	var self = this;
	this.currentHeight = 0;
	this.plan = undefined;
	if(heightMax === undefined){
		this.maxHeight = 180;
	}
	this.maxHeight = heightMax;
	drone.after(2000, function(){
			this.animateLeds('blinkGreenRed',5,5); // Leds blinking
			eventEmitter.emit('drone_init');
		});

	eventEmitter.on("getValue", function() {
		console.log("onGetValue");
		eventEmitter.emit("getValueResponse", {maxHeight: this.maxHeight});
	});
}

Drone.prototype.setPlan = function (plan) {

	if( plan === undefined ){
		console.log('Plan cannot be found.')
	}else {
		this.plan = plan;
	}
};

// - Action Array Analysis and post-action treatment

Drone.prototype.execute = function (action){
	// console.log('DEBUG : drone.execute()');
	// Type action evaluation
	var currentState = {maxHeight: this.maxHeight};
	var self = this;
	switch(action.type){
		case ETypeAction_file.ETypeAction.Move.key : 
			//Direction Evaluation				
			switch(action.direction){

			case EDirection_file.EDirection.Forward.key :
				drone.after(500, function(){
					this.front(0.1);
					console.log('- movement time :'+self.getMovementTime(action.value));
					console.log('[SUCCESS] - ACTION PERFORMED : MOVE FORWARD ON 0.1 CM');
					setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
				});
				break;

			case EDirection_file.EDirection.Backward.key :
				drone.after(500, function (){
					this.back(0.1);
					console.log('- movement time :'+self.getMovementTime(action.value));
					console.log('[SUCCESS] - ACTION PERFORMED : MOVE BACKWARD ON 0.1 CM');
					setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
				});
				break;

			case EDirection_file.EDirection.Left.key :
				drone.after(500, function (){
          // this.counterClockwise(0.5);
          // this.front(0.1);
          this.left(0.1);
					console.log('- movement time :'+self.getMovementTime(action.value));
					console.log('[SUCCESS] - ACTION PERFORMED : MOVE LEFT ON 0.1 CM');
					setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
				});
				break;

			case EDirection_file.EDirection.Right.key :
				drone.after(500, function (){
          // this.clockwise(0.5);
          // this.front(0.1);
          this.right(0.1);
					console.log('- movement time :'+self.getMovementTime(action.value));
					console.log('[SUCCESS] - ACTION PERFORMED : MOVE RIGHT ON 0.1 CM');
					setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
				});
				break;

			case EDirection_file.EDirection.Up.key :
				var heightSum = this.currentHeight + action.value;
				if( heightSum >= this.maxHeight){
					drone.after(500, function() {
						this.up(  ( ( self.maxHeight - self.currentHeight ) / 100 ) );
						console.log('- movement time :'+self.getMovementTime(action.value));
						console.log('[SUCCESS] - ACTION PERFORMED : MOVE UP TO 0.1 CM');
						self.currentHeight = self.maxHeight;
						setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
					});	 
				} else {
					drone.after(500, function() {
						this.up(  (action.value / 100 ) );
						var altitude = self.currentHeight + action.value;
						console.log('- movement time :'+self.getMovementTime(action.value));
						console.log('[SUCCESS] - ACTION PERFORMED : MOVE UP TO 0.1 CM');
						self.currentHeight = altitude;
						setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');},self.getMovementTime(action.value));
					});
				}
				break;

			case EDirection_file.EDirection.Down.key :
				if( this.currentHeight - action.value <= 0 ){
					drone.after(500, function() {
						this.down(0.05);
						console.log('- movement time :'+self.getMovementTime(action.value));
						console.log('[SUCCESS] - ACTION PERFORMED : MOVE DOWN TO 100 CM');
						setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
					});
				} else {
					drone.after(500, function() {
						this.down(  (action.value / 100 ) );
						console.log('- movement time :'+self.getMovementTime(action.value));
						console.log('[SUCCESS] - ACTION PERFORMED : MOVE DOWN TO ' + ( self.currentHeight - action.value ) + ' CM');
						setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');}, self.getMovementTime(action.value));
					});
				}
				break;

			default: 
				console.log("ACTION ERR : Direction is not defined");
				eventEmitter.emit('drone_stopEmergency');
			} //End Direction Evaluation

		break;


		case ETypeAction_file.ETypeAction.Rotate.key :	
				switch(action.direction){

					case EDirection_file.EDirection.Left.key :
						drone.after(1000, function() {
							this.counterClockwise(0.5);
							console.log('- movement time :'+self.getMovementTime(action.value));
							console.log('[SUCCESS] - ACTION PERFORMED : ROTATION LEFT OF '+action.value);
							setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');},self.getRotationTime(action.value));
						});
						break;

					case EDirection_file.EDirection.Right.key :
						drone.after(1000, function() {
							this.clockwise(0.5);
							console.log('- movement time :'+self.getMovementTime(action.value));
							console.log('[SUCCESS] - ACTION PERFORMED : ROTATION RIGHT OF '+action.value);
							setTimeout(function () {drone.stop(); eventEmitter.emit('drone_action');},self.getRotationTime(action.value));
						});
						break;
						
					default: 
						console.log("ACTION ERR : Direction is not defined");
				}	
			break;

		default: 
			console.log('ACTION ERR : ActionType not defined');
			eventEmitter.emit('drone_stopEmergency');
	} // Type Action Evaluation End
};

// - Fly order
Drone.prototype.startFlight = function(){
	drone.takeoff();
	this.currentHeight = 1;
	drone
		.after(2000, function(){
			this.animateLeds('green',5,5);		
			eventEmitter.emit('drone_start');
		});	
};

// - Land order
Drone.prototype.stopFlight = function (){
	drone.stop();
	drone.land();	
	eventEmitter.emit('drone_stop');
};

// - Height getter
Drone.prototype.getMaxHeight = function(){
	return this.heightMax;
};

// - Height setter
Drone.prototype.setMaxHeight = function(height){
	this.heightMax = height;
};

// - movements time
Drone.prototype.getMovementTime = function(value){ // value:cm
return (value*30);
};

//- rotation time 
Drone.prototype.getRotationTime = function(value){ // value:degree
return (value*10);
};

module.exports = Drone;
