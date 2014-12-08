var arDrone = require('ar-drone');

var drone = arDrone.createClient();

drone.stop();
drone.land();