Message Types
=============
The messages sent through the websockets during a game.

Server to client
----------------
### initBoard

`maxPlayers == 0` means no limit.
the `colors` array is only non-empty when the server provides the color palette information.

```javascript
{
	"msg": "initBoard",
	"boardWidth": 500,
	"boardHeight": 600,
	"cardCount": 13,
	"maxPlayers": 2,
	"colors": [colorString, ...],
	"creationUrl": "url to create similar game"
}
```

### cardMove
`x`,`y` are the center of the card as a relative (%) position on the board.
`phi` is the angle in degrees.

```javascript
{
	"msg": "cardMove",
	"id": 13,
	"x": 0.13,
	"y": 0.52,
	"phi": 30,
}
```

### cardOpen
`type` is the "picture" on the card ; you could also call it "class" if you prefer.

If the card happens to be scored, the scoring player id is saved in `scoredBy`.

```javascript
{
	"msg": "cardOpen",
	"id": 13,
	"type": 4,
	"scoredBy": -1
}
```

### cardsClose
When one or more cards need to be flipped closed together.
The client probably wants to do that with a little delay, as it will be
sent immediately after the second card is opened.

```javascript
{
	"msg": "cardsClose",
	"ids": [13, 10]
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

### turns

```javascript
{
	"msg": "turns",
	"pid": 13,
	"turns": 2,
	"flips": 4
}
```

### player
This message is sent both whenever a new player joins and when a player changes his name or color.

```javascript
{
	"msg": "player",
	"pid": 13,
	"itsyou": false,
	"name": "Bob",
	"points": 2,
	"flips": 18,
	"turns": 18,
	"color": "#F00"
}
```

### leaver

```javascript
{
	"msg": "leaver",
	"pid": "13"
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

### errors

#### err\_gameid

```javascript
{
	"msg": "err_gameid",
	"gid": "XZejbF"
}
```

#### err\_gamefull

```javascript
{
	"msg": "err_gamefull",
	"gid": "FooBar",
	"max": 10
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

### wantChangeColor

```javascript
{
	"wantChangeColor": "#F00"
}
```

### moveCard

```javascript
{
	"moveCard": {
		"id": 13,
		"x": 0.25,
		"y": 0.043,
		"phi": 120
	}
}
```

