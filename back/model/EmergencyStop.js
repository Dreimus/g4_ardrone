var arDrone = require('ar-drone');
var drone = arDrone.createClient();

/* --- Fonction d'arrêt d'urgence --- */
function emergencyStop() {
	console.log('arrêt d\'urgence !');
	drone.stop();
	drone.land();
}

module.exports = emergencyStop;