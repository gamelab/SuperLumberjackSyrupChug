var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Audio = function(game) {

	this.game = game;
	this.currentBackgroundTrack = null;

	//Looping Background Track
	this.titleTrack = new Kiwi.Sound.Audio(this.game, 'title-loop', 0.8, true);
	this.selectTrack = new Kiwi.Sound.Audio(this.game, 'select-loop', 0.8, true);
	this.gameTrack = new Kiwi.Sound.Audio(this.game, 'game-loop', 0.6, true);
	this.loserTrack = new Kiwi.Sound.Audio(this.game, 'loser', 0.8, true);
	this.winnerTrack = new Kiwi.Sound.Audio(this.game, 'winner', 0.8, true);
	this.finalTrack = new Kiwi.Sound.Audio(this.game, 'final-loop', 0.8, true);

	this.button = new Kiwi.Sound.Audio(this.game, 'button', 0.8, false);
	this.countDown = new Kiwi.Sound.Audio(this.game, 'countdown', 0.8, false);

	this.gameTrackTween = this.game.tweens.create(this.gameTrack);

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

	this.gameTrack.volume = 0.6;

	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.gameTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playLoserTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop()
		this.gameTrackTween.onComplete(function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.loserTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({ volume: 0 }, 1000 );
		this.gameTrackTween.start();
	
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.loserTrack;
		this.currentBackgroundTrack.play();

	}

}

SuperLumberjackSyrupChug.Audio.prototype.playFinalTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop();
		this.gameTrackTween.onComplete( function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.finalTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({volume:0}, 1000);
		this.gameTrackTween.start();
		
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.finalTrack;
		this.currentBackgroundTrack.play();

	}

};

SuperLumberjackSyrupChug.Audio.prototype.playWinnerTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop()
		this.gameTrackTween.onComplete(function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.winnerTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({ volume: 0 }, 1000 );
		this.gameTrackTween.start();
	
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.winnerTrack;
		this.currentBackgroundTrack.play();

	}

}

SuperLumberjackSyrupChug.Audio.prototype.playButton = function() {
	this.button.play('default', true);
}

SuperLumberjackSyrupChug.Audio.prototype.playCountDown = function() {
	this.countDown.play('default', true);
}