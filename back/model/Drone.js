/* var arDrone = require('ar-drone');
var drone = arDrone.createClient();

drone.takeoff();
console.log('takeoff..');


*/

/* --- fonction d'arrêt d'urgence --- */
/*
function emergency_stop() {
	console.log('arrêt d\'urgence !!');
	.drone.stop();
	.drone.land();
}
*/


//var arDrone = require('ar-drone');
//var drone = arDrone.createClient();
var autonomy = require('ardrone-autonomy');
var drone = autonomy.createMission();
var eventEmitter = require('events').EventEmitter
var heightMax, currentHeight;



//=======================================================================================
// fonction d'initialisation au demarage.	
function init(heightMax){
	if(heightMax===undefined){
		heightMax=180;
	}
	setHeightMax=heightMax;
	drone
		.after(2000, function(){
			console.log('Initialisation');
			this.animateLeds('blinkRedOrangeGreen',5,5); // fait clignoter les leds pour verif fonctionement.		
		});
	eventEmitter.emit("drone_init");
}

//======================================================================================

function execute(plan){
	var actionList=plan.getFlyActionList();

	for (var index=0;index<actionList.lenght;index++) {
		switch(actionList[index].type){
			case ETypeAction_file.ETypeAction.Move : 				
				switch(actionList[index].direction){
					case EDirection_file.EDirection.Forward :
						drone.forward( ( actionList[index].value / 100 ) );
						break;
					case EDirection_file.EDirection.Backward :
						drone.backward( ( actionList[index].value / 100) );
						break;
					case EDirection_file.EDirection.Left :
						drone.left(( actionList[index].value / 100 ) );
						break;
					case EDirection_file.EDirection.Right :
						drone.right( ( actionList[index].value / 100 ) );
						break;
					case EDirection_file.EDirection.Up :
						if( ( currentHeight + actionList[index].value ) < getHeightMax){
						drone.up( ( actionList[index].value / 100 ) );
						}
						break;
					case EDirection_file.EDirection.Down :
						drone.down( ( actionList[index].value / 100 ) );
						break;
				}			
				break;
			case ETypeAction_file.ETypeAction.Rotate :	
					switch(actionList[index].direction){
					case EDirection_file.EDirection.Left :
						drone.cw(actionList[index].value);
						break;
					case EDirection_file.EDirection.Right :
						drone.ccw(actionList[index].value);
						break;
				}	
				break;
			default: 
				console.log("Erreur de traitement de l'action"+index);
		}
		eventEmitter.emit('drone.action');
	}
}

//=======================================================================================
// décollage!
function startFlight(){
	drone.takeoff();
	currentHeight=1;

	drone
		.after(2000, function(){
			this.animateLeds('green',5,5);		
		});
	
	
	eventEmitter.emit("drone_start");
}

//=======================================================================================
// Atterissage!
function stopFlight(){
	drone
		.after(1000, function() {
			this.stop();
			this.land();
		});
		
	eventEmitter.emit("drone_stop");
}

//=======================================================================================

function getHeightMax(){
return heightMax;
}
function setHeightMax(height){
heightMax=height;
}

//=======================================================================================
