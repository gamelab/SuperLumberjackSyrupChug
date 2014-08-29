var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Audio = function(game) {

	this.game = game;
	this.currentBackgroundTrack = null;

	//Looping Background Track
	this.titleTrack = new Kiwi.Sound.Audio(this.game, 'title-loop', 1, true);
	this.button = new Kiwi.Sound.Audio(this.game, 'button', 1, false);

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

SuperLumberjackSyrupChug.Audio.prototype.playButton = function() {
	this.button.play();
}