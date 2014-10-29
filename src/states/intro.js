var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Intro = new Kiwi.State('Intro');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features.
*/

SuperLumberjackSyrupChug.Intro.init = function() {
	this.game.audioMan = new SuperLumberjackSyrupChug.Audio( this.game );
    this.game.tournament = new SuperLumberjackSyrupChug.Tournament( this.game );
    this.game.background = new SuperLumberjackSyrupChug.Background( this.game );
	this.game.stage.resize(222, 125);

	if(typeof Cocoon !== "undefined" && typeof Cocoon.Utils !== "undefined" && typeof Cocoon.Utils.setAntialias !== "undefined") {
		Cocoon.Utils.setAntialias(false);
	}
}


SuperLumberjackSyrupChug.Intro.create = function () {

	this.game.stage.color = '000000';
	this.game.audioMan.playTitleTrack();


	this.background = this.game.background.create( this );
	this.addChild(this.background);


	this.title = new Kiwi.GameObjects.Sprite(this, this.textures.title, 5, 5);
	this.title.x = Math.round(this.game.stage.width * 0.5 - this.title.width * 0.5);
	this.title.animation.add('default', [0,1,2,3,4,5], 0.05, true, true);
	this.addChild(this.title);


	this.play = new Kiwi.GameObjects.Sprite(this, this.textures.play, Math.round(this.title.x), 0);
	this.play.y = Math.round(this.game.stage.height - this.play.height) - 5;
	this.play.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.play);


	this.playText = new Kiwi.GameObjects.Sprite( this, this.textures['play-text'], Math.round(this.play.x), Math.round(this.play.y));
	this.addChild(this.playText);

	this.playText.input.onEntered.add(function() {
		this.cellIndex = 1;
	}, this.playText);
	this.playText.input.onLeft.add(function() {
		this.cellIndex = 0;
	}, this.playText);
	this.playText.input.onUp.add(function() {
		this.cellIndex = 0;
	}, this.playText);
	this.playText.input.onDown.add(function() {
		this.cellIndex = 1;
	}, this.playText);


	this.sound = new Kiwi.GameObjects.Sprite(this, this.textures.sound, 0, Math.round(this.play.y));
	this.sound.x = Math.round(this.title.x + this.title.width - this.sound.width);
	this.sound.input.onUp.add(this.toggleSound, this);
	this.addChild(this.sound);

	if(this.game.audio.mute) {
		this.sound.cellIndex = 1;
	}

	this.play.input.onUp.add(this.selectCharacter, this);

}


SuperLumberjackSyrupChug.Intro.selectCharacter = function() {
	this.game.audioMan.playButton();
	this.game.states.switchState('Select');
}


SuperLumberjackSyrupChug.Intro.toggleSound = function() {

	this.game.audioMan.playButton();

	if(this.game.audio.mute) {
		this.game.audio.mute = false;
		this.sound.cellIndex = 0;
	} else {
		this.game.audio.mute = true;
		this.sound.cellIndex = 1;
	}

}