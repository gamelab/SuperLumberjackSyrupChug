var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Facebook = new Kiwi.State('Facebook');


SuperLumberjackSyrupChug.Facebook.init = function() {

	this.game.audioMan = new SuperLumberjackSyrupChug.Audio( this.game );
    this.game.tournament = new SuperLumberjackSyrupChug.Tournament( this.game );
    this.game.background = new SuperLumberjackSyrupChug.Background( this.game );

	this.game.stage.resize( this.game.size.width, this.game.size.height );

	this.game.social.facebook.init( {
		appId: '299973880205978'
	} );

	if(typeof Cocoon !== "undefined" && typeof Cocoon.Utils !== "undefined" && typeof Cocoon.Utils.setAntialias !== "undefined") {
		Cocoon.Utils.setAntialias(false);
	}

};


SuperLumberjackSyrupChug.Facebook.create = function () {

	this.fbButton = new Kiwi.GameObjects.StaticImage(this, this.textures['fb-button'] );
	this.fbButton.x = Math.round( (this.game.stage.width - this.fbButton.width) * 0.5 );
	this.fbButton.y = 20 * this.game.size.scale;


	this.noThanks = new Kiwi.GameObjects.StaticImage(this, this.textures['no-thanks'] );
	this.noThanks.x = Math.round( (this.game.stage.width - this.noThanks.width) * 0.5 );
	this.noThanks.y = this.fbButton.y + this.fbButton.height + 10 * this.game.size.scale;

	this.addChild(this.noThanks);
	this.addChild(this.fbButton);


	this.game.input.onUp.add( this.processInput, this);

};

SuperLumberjackSyrupChug.Facebook.processInput = function(x,y) {

	if ( this.fbButton.box.bounds.contains(x,y) ) {
		//Login with facebook
		this.game.social.gamefroot.loginWithFB( {
			context: this,
			callback: this.playGame
		} );
		return;
	}

	if ( this.noThanks.box.bounds.contains(x,y) ) {
		this.playGame();
		return;
	}

};

SuperLumberjackSyrupChug.Facebook.playGame = function() {

	this.game.states.switchState('Intro');

};

SuperLumberjackSyrupChug.Facebook.shutDown = function() {

	this.game.fileStore.removeFile('fb-button');
	this.game.fileStore.removeFile('no-thanks');

};