var arDrone = require('ar-drone');
var drone = arDrone.createClient();

drone.takeoff();

drone
	.after(4000, function()	{
		this.clockwise(0.2); //tourne sur lui même
		this.left(0.01); // ..(speed) 0.01=1m en distance.
	})
	.after(2000, function() {
		this.stop();
		this.land();
	});
	
//initialisation du drone
functionInit(){

drone
	.after(1000, function(){
		this.calibrate(0); // fait une calibration au decollage, provoque un 360 brusque.
		this.animateLeds('blinkGreenOrangeRed',5,5)// anime les leds a 5Hz pendant 5s.
	});
}