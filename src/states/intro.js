var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Intro = new Kiwi.State('Intro');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features. 
*  
* Right now we are just switching straight to the PlayState.
*
*/

SuperLumberjackSyrupChug.Intro.init = function() {
	this.game.audioMan = new SuperLumberjackSyrupChug.Audio( this.game );
}


SuperLumberjackSyrupChug.Intro.create = function () {

	this.game.stage.color = '000000';

	this.game.audioMan.playTitleTrack();


	this.title = new Kiwi.GameObjects.Sprite(this, this.textures.title, 10, 20);
	this.title.x = this.game.stage.width * 0.5 - this.title.width * 0.5;
	this.title.animation.add('default', [0,1,2,3,4,5], 0.05, true, true);
	this.addChild(this.title);


	this.play = new Kiwi.GameObjects.Sprite(this, this.textures.play, this.title.x, 0);
	this.play.y = this.game.stage.height - this.play.height - 10;
	this.play.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.play);


	this.sound = new Kiwi.GameObjects.Sprite(this, this.textures.sound, 0, this.play.y);
	this.sound.x = this.title.x + this.title.width - this.sound.width;
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