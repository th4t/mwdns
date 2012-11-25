//nice tutorial: http://craftyjs.com/tutorial/bananabomber/create-a-game
var WIDTH  = 500
	, HEIGHT = 500

var assetPrefix = "/static/img/assets/"
var assets = ["flare_armor.png"]
assets = assets.map(getAssetPath)

function getAssetPath(asset) {
	return assetPrefix+asset
}

function init() {
	//set game display to the full window
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	//TODO: resize handler

	//start crafty
	Crafty.init(WIDTH, HEIGHT)
	//Crafty.canvas.init(); //to use a canvas instead of dom elements (slower)

	Crafty.scene("loading")
}

function TileMapArmor() {
	this.map = {}
	this.isTileMap = true
	this.name = "Armor"
	this.componentPrefix = "armor"

	this.fileName = "flare_armor.png"
	this.path = getAssetPath(this.fileName)

	this.count = 24
	this.tileSize = 64

	for (var i = 1; i < 25; i++) {
		this.map[this.componentPrefix+(i-1)] = [i%5,Math.floor(i/5)]
	}
}

//TODO: rather a map with available image sources (TileMap objects)
var cardSource
var deckFaceImg
function initAssets() {
	deckFaceImg = "/static/img/patterns/subtle/vichy.png"
	cardSource = new TileMapArmor()
	if (cardSource.isTileMap) {
		Crafty.sprite(cardSource.cardSize, cardSource.path, cardSource.map);
	} else {
		console.log("Not a tilemap, how do I handle this one?")
	}
}

var cards = []
function createCards(cardCount) {
	if (cardCount > cardSource.count*2) {
		console.log("Error: I don't have so many distinct cards to show :(")
		return
	}

	//create crafty game objects
	for (var i=0; i<cardCount; i++)
	{
		console.log(cardSource.componentPrefix+1)
		var card = Crafty.e("Card") //TODO
								.makeCard(100,100);
		cards.push(card)
		
		/*
		var top = i*3+50;
		var left = i*3+10;
		$('#cardContainer').append('<div id="card_'+i+'"  class="flip_card card-boarder" style="top:'+top+'px; left:'+left+'px; " ></div>');
		$("#card_"+i).html($("#cardBackContent").html());
		addClickHandler(i);
		*/
	}
}
