var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Splash = new Kiwi.State('Splash');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features.
*/


SuperLumberjackSyrupChug.Splash.create = function () {

	this.splash = new Kiwi.GameObjects.StaticImage(this, this.textures.burns);
	this.splash.x = (this.game.stage.width - this.splash.width) * 0.5;
	this.splash.y = (this.game.stage.height - this.splash.height) * 0.5;
	this.splash.alpha = 0;
	this.addChild( this.splash );

	//Double Tween
	this.fadeIn = this.game.tweens.create(this.splash);
	this.fadeOut = this.game.tweens.create(this.splash);

	this.fadeIn.chain(this.fadeOut);
	this.fadeOut.delay(2000);

	this.fadeIn.to({alpha: 1}, 1000);
	this.fadeOut.to({alpha: 0}, 1000);

	this.fadeIn.onComplete(this.switchBackgroundColor, this);
	this.fadeOut.onComplete(this.play, this);

	this.fadeIn.start();

};

SuperLumberjackSyrupChug.Splash.switchBackgroundColor = function() {
	this.game.stage.color = 'fff';
};

SuperLumberjackSyrupChug.Splash.play = function() {

	this.game.states.switchState('Facebook');

};

SuperLumberjackSyrupChug.Splash.shutDown = function() {

	this.game.fileStore.removeFile('burns');

};