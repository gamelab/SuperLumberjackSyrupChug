var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Play = new Kiwi.State('Play');


/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
SuperLumberjackSyrupChug.Play.create = function (chosenPlayer) {

  // Create input methods
  var self = this;
	this.game.input.onUp.add( this.tap, this );

  // Create background
  this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
  this.addChild(this.background);

  //Table
  this.table = new Kiwi.GameObjects.StaticImage(this, this.textures.table, 0, this.game.stage.height);
  this.table.y -= this.table.height;
  this.addChild( this.table );

  this.game.audioMan.playGameTrack();
  
  // Create and connect player 1
  // This is the player sitting at this computer
  this.player1 = new SuperLumberjackSyrupChug.Player( this, chosenPlayer );
  this.addChild(this.player1);

  // Create and connect player 2
  // In multiplayer, this will be connected to a server and another player
  var randomAI = Math.floor(Math.random() * 8 + 1);
  this.player2 = new SuperLumberjackSyrupChug.Player( this, randomAI );
  this.player2.x = this.game.stage.width;
  this.player2.scaleX = -1; 
  this.addChild(this.player2);

  // Create hud elements

  this.tapToChug = new Kiwi.GameObjects.StaticImage(this, this.textures['tap-to-chug'], 0, 93);
  this.tapToChug.x = (this.game.stage.width - this.tapToChug.width) * 0.5 + 1;
  this.addChild( this.tapToChug );

}

SuperLumberjackSyrupChug.Play.update = function() {
  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  // Perform AI

  // Perform chugodynamics
  this.player1.run();
  this.player2.run();

  // Diagnose stomach

}

SuperLumberjackSyrupChug.Play.tap = function() {
  this.player1.chug();  
}
