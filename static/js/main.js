var conn

function connect() {
	var messagesCount = 0;
	if (window["WebSocket"]) {
		// parse current url parameters
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		var g = vars["g"]

		//connect to the current host/port combination
		var address = "ws://"+window.location.hostname+":"+window.location.port+"/ws?g="+g
		conn = new WebSocket(address);
		conn.onclose = function(evt) {
			console.log(evt) //DEBUG
		}
		conn.onmessage = function(evt) {
			console.log("Msg:" + evt.data) //DEBUG
			handleMessage(evt.data);
		}
	} else {
		console.log("Your browser does not support WebSockets.")
	}
}

function handleMessage(msg){
	var json = jQuery.parseJSON(msg);
	if ( json.msg == "initBoard" ) {
		createBoard(json.boardSizeX, json.boardSizeY)
		createCards(json.cardCount)
	} else if ( json.msg == "cardMove" ) {
		//TODO: change duration, based on movement speed and movement distance
		//move respective card (json.id)
		//cards[json.id].tween({x: json.x, y:json.y, rotation: json.phi}, MOVEMENT_SPEED)
	} else if ( json.msg == "cardFlip" ) {
		gameCards[json.id].flipCard(json.type)
	} else if ( json.msg == "player" ) {
		//TODO
	} else if ( json.msg == "end" ) {
		//TODO: display final game screen (scores, winner, new game)
	}
}

$(document).ready(function() {
	init()
	connect()
})
