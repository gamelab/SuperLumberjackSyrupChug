
/**
* The core SuperLumberjackSyrubChug game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 600
}

var game = new Kiwi.Game('content', 'SuperLumberjackSyrubChug', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(SuperLumberjackSyrubChug.Loading);
game.states.addState(SuperLumberjackSyrubChug.Intro);
game.states.addState(SuperLumberjackSyrubChug.Play);

game.states.switchState("Loading");