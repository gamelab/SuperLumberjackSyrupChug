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
SuperLumberjackSyrupChug.Play.create = function () {
  // Create input methods
  var self = this;
	this.game.input.onUp.add( function(){ self.player1.chug; } );

  // Create background
  
  // Create and connect player 1
  // This is the player sitting at this computer
  this.player1 = new SuperLumberjackSyrupChug.Player( this );

  // Create and connect player 2
  // In multiplayer, this will be connected to a server and another player
  this.player2 = new SuperLumberjackSyrupChug.Player( this );

  // Create hud elements
}

SuperLumberjackSyrupChug.Play.update = function() {
  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  // Perform AI

  // Perform chugodynamics
  this.player1.run();
  this.player2.run();
}
