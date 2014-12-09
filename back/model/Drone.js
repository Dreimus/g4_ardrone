var arDrone = require('ar-drone');
var drone = arDrone.createClient();

drone.takeoff();
console.log('takeoff..');




/* --- fonction d'arrêt d'urgence --- */
function emergency_stop() {
	console.log('arrêt d\'urgence !!');
	.drone.stop();
	.drone.land();
}