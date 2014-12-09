
var arDrone = require('ar-drone');
var drone = arDrone.createClient();
var eventEmitter = require('events').EventEmitter
var hightMax;



//=======================================================================================
// fonction d'initialisation au demarage.	
function init(hightMax:180){

drone
	.after(2000, function(){
		console.log('Initialisation');
		this.animateLeds('blinkRedOrangeGreen',5,5); // fait clignoter les leds pour verif fonctionement.		
	});
}.eventEmitter.emit("drone_init");

//======================================================================================

function execute(){


}

//=======================================================================================
// décollage!
function startFlight(){
drone.takeoff();

drone
	.after(2000, function(){
		this.calibrate(0); // calibre le drone au decolage, provoque un 360.
		this.animateLeds('green',5,5);		
	};
}.eventEmitter.emit("drone_start");

//=======================================================================================
// Atterissage!
function stopFlight(){
drone
	.after(1000, function() {
		this.stop();
		this.land();
	};
}.eventEmitter.emit("stop_start");

//=======================================================================================

function getHightMax(){
return hightmax;
}
function setHightMax(hight){
hightmax=hight;
}
export.getHightMax=hightmax;

//=======================================================================================
