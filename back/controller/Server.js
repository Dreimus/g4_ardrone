/*-------------------------------------------------*\
					SERVER.JS

	Description : 

	This file create the interaction between 
	website remote control and the device's
	Controller.

\*-------------------------------------------------*/

function start(){

	// Socket instanciation & server creation - PORT : 13000
	var foo = require('http');
	var query, server;

	// --------- FLUSHING ------------------
	//Fonction principale d'envoi de données
	function onRequest(request, response){
		consol.log(" - Request received - ");
		//Definition of content-type on message header.
		reponse.writeHead(200, {"Content-Type" : "text/plain"});
		//Data sending
		reponse.write(data);
		server.end('END OF TRANSMISSION');
	}


	// --------- Main ---------

	server = foo.createServer(onRequest).listen(13000);
	console.log(" - Server started - ");
} // DO NOT REMOVE THIS BRACKET

//Global function start() declaration
export.start = start;