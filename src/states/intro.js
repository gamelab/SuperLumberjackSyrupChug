var SuperLumberjackSyrubChug = SuperLumberjackSyrubChug || {};

SuperLumberjackSyrubChug.Intro = new Kiwi.State('Intro');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features. 
*  
* Right now we are just switching straight to the PlayState.
*
*/


SuperLumberjackSyrubChug.Intro.create = function () {

	this.game.stage.color = '000000';


	this.title = new Kiwi.GameObjects.Sprite(this, this.textures.title, 10, 20);
	this.title.animation.add('default', [0,1,2,3,4,5], 0.05, true, true);
	this.addChild(this.title);


	this.play = new Kiwi.GameObjects.Sprite(this, this.textures.play, 10, 0);
	this.play.y = this.game.stage.height - this.play.height - 10;
	this.play.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.play);


	this.sound = new Kiwi.GameObjects.Sprite(this, this.textures.sound, 0, this.play.y);
	this.sound.x = this.title.x + this.title.width - this.sound.width;
	this.addChild(this.sound);

	this.play.input.onUp.add(this.selectCharacter, this);

}


SuperLumberjackSyrupChug.Intro.selectCharacter = function() {

	this.game.states.switchState('Select');

}