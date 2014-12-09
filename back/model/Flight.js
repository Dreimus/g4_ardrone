var arDrone = require('ar-drone');
var drone = arDrone.createClient();
var hightmax;

drone.takeoff();


// fonction d'initialisation au demarage.	
function init(){

higtmax=180;

drone
	.after(1000, function(){
		console.log('Initialisation');
		this.calibrate(0); // calibre le drone au decolage, provoque un 360.
		this.animateLeds('blinkGreenOrangeRed',5,5); // fait clignoter les leds pour verif fonctionement.
		this.getVideoStream();
	});
}

function getHightMax(){

return hightmax;
}

function setHightMax(hight){
hightmax=hight;

}

export.getHightMax=hightmax;

