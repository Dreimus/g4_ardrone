var arDrone = require('ar-drone');
var drone = arDrone.createClient();

drone.takeoff();

drone
	.after(4000, function()	{
		this.clockwise(0.2); //tourne sur lui même
		this.left(0.01); // ..(speed)
	})
	.after(2000, function() {
		this.stop();
		this.land();
	});