Message types
=============
The messages sent through the websockets during a game.

Server to client
----------------
### initBoard
```javascript
{
	"msg": "initBoard"
	"cardCount": 13
	"boardSizeX": 1000
	"boardSizeY": 1000
	"cardSizeX": 300
	"cardSizeY": 300
}
```

### cardMove
x,y are the top left corner of the card.
phi is the angle in degrees.
```javascript
{
	"msg": "cardMove",
	"id": 13,
	"x": 124,
	"y": 234,
	"phi": 0.03,
}
```

### cardFlip
Type is the "picture" on the card ; you could also call it "class" if you prefer.
If the type changes from something to -1 (i.e. the card flips closed),
the client side needs to show the closing animation 1-2 seconds later.
This is necessary for the case of the second card being opened and not matching
the first card, so that everyone has enough time to see both card.

If the card happened to be already scored the scoring player id is saved in "scoredBy"
```javascript
{
	"msg": "cardFlip",
	"id": 13,
	"type": -1,
	"scoredBy": -1
}
```

### chatmsg
```javascript
{
	"msg": "chat",
	"from": "luck.duck",
	"content": "gg n00bs"
}
```

### points
```javascript
{
	"msg": "points",
	"pid": 13,
	"points": 9001
}
```

### newplayer
```javascript
{
	"msg": "newplayer"
	"pid": 13,
	"name": "Bob",
	"itsyou": false
}
```

### canplay
```javascript
{
	"msg": "canplay",
	"pid": 13,
	"canPlay": false
}
```

### endgamemsg
```javascript
{
	"msg": "end"
}
```

Client to server
----------------

### wantFlip
A client can send this to the server whenever it wants to flip OPEN a card. There will be no answer.
The client should wait to get a "flipped" message, or nothing ever.
```javascript
{
	"wantFlip": "13"
}
```

### chatmsg
```javascript
{
	"chat": "gl, hf"
}
```

### wantChangeName
```javascript
{
	"wantChangeName": "Bob"
}
```

### moveCard
```javascript
{
	"moveCard": {
		"id": 13,
		"x": 123,
		"y": 25,
		"phi": 120
	}
}
```
