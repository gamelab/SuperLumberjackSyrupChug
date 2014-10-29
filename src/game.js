
/**
* The core SuperLumberjackSyrupChug game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	width: 960,
	height: 541,
	renderer: Kiwi.RENDERER_CANVAS,
	scaleType: Kiwi.Stage.SCALE_FIT,
	debug: Kiwi.DEBUG_OFF
};

var game = new Kiwi.Game('content', 'SuperLumberjackSyrupChug', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(SuperLumberjackSyrupChug.Loading);
game.states.addState(SuperLumberjackSyrupChug.Intro);
game.states.addState(SuperLumberjackSyrupChug.Select);
game.states.addState(SuperLumberjackSyrupChug.Play);
game.states.addState(SuperLumberjackSyrupChug.GameOver);
game.states.addState(SuperLumberjackSyrupChug.Splash);

game.states.switchState("Loading");