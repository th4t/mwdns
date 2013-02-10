Scoreboard = function(selector) {
	this.node = $(selector)
	this.pid_rows = {}
}

Scoreboard.prototype.addPlayer = function(pid, name, color, score, canplay) {
	// TODO: This should probably be in some template file somewhere else.
	template = "<tr id=player" + pid + ">"
	         + "  <td class=name>"
	         + "    <div class=color></div><span>" + name + "</span>"
	         + "  </td>"
	         + "  <td class=points>" + score + "</td>"
	         + "</tr>";
	this.node.find('table').append(template)
	this.pid_rows[pid] = this.node.find('#player' + pid)

	this.updateCanPlay(pid, canplay)
}

Scoreboard.prototype.updateName = function(pid, name) {
	this.pid_rows[pid].find('.name span').text(name)
}

Scoreboard.prototype.updateColor = function(pid, color) {
	this.pid_rows[pid].find('.color').css('background-color', color)
}

Scoreboard.prototype.updateScore = function(pid, score, delta) {
	// TODO: keep the scoreboard sorted?
	this.pid_rows[pid].find('.points').text(score)

	// TODO: Show a special effect using the delta, if given
}

Scoreboard.prototype.updateCanPlay = function(pid, canplay) {
	// You can play: black name. You can't play: grey name.
	this.pid_rows[pid].find('.name span').css('color', canplay ? 'black' : 'grey')
}

Scoreboard.prototype.leaver = function(pid) {
	// Leaver gets greyed- and striked- out name...
	this.pid_rows[pid].find('.name span').css({
		'color': 'grey',
		'text-decoration': 'line-through'
	})
	// ...and of course no points!
	this.pid_rows[pid].find('.points').text('LEFT')
	this.pid_rows[pid].find('.points').css('color', 'red')
}
