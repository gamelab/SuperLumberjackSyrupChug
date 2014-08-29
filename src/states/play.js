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

	
  
}

SuperLumberjackSyrupChug.Play.update = function() {
  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  // Detect taps

  // Perform AI

  // Perform chugodynamics

  // Render scene

  // Render bars
}
