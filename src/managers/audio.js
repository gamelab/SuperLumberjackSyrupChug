var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Audio = function(game) {

	this.game = game;
	this.currentBackgroundTrack = null;

	//Looping Background Track
	this.titleTrack = new Kiwi.Sound.Audio(this.game, 'title-loop', 0.8, true);
	this.selectTrack = new Kiwi.Sound.Audio(this.game, 'select-loop', 0.8, true);
	this.gameTrack = new Kiwi.Sound.Audio(this.game, 'game-loop', 0.6, true);

	this.button = new Kiwi.Sound.Audio(this.game, 'button', 0.8, false);

}

SuperLumberjackSyrupChug.Audio.prototype.stopBackgroundTrack = function() {
	if(this.currentBackgroundTrack !== null) {
		this.currentBackgroundTrack.stop();
	}
}

SuperLumberjackSyrupChug.Audio.prototype.playTitleTrack = function() {
	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.titleTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playSelectTrack = function() {
	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.selectTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playGameTrack = function() {
	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.gameTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playButton = function() {
	this.button.play('default', true);
}
