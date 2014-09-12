var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.GameOver = new Kiwi.State('GameOver');


SuperLumberjackSyrupChug.GameOver.create = function(enemyWon, winner, player1) {

	this.winner = winner;
	this.player1 = player1;

	// Determine win or loss
	if( enemyWon ) {
		// You lost; config lose screen
		this.configLose();
	}
	else {
		// You won; config victory screen
		this.configWin();
	}

	// Config universal buttons

	// Victor display
	this.displayVictor();

	// Quit button
	this.quit = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-quit"], 0, 0);
	this.quit.y = Math.floor( (this.game.stage.height - this.quit.height) / 2 );
	this.quit.x = Math.floor( this.quit.y * 0.3 );
	//this.quit.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.quit);
	this.quit.input.onUp.add(this.buttonQuit, this);

	// Tweet button
	this.tweet = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-tweet"], 0, 0);
	this.tweet.y = Math.floor( (this.game.stage.height - this.tweet.height) / 2 );
	this.tweet.x = Math.floor( this.game.stage.width - (this.tweet.width + this.tweet.y * 0.3) );
	//this.tweet.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.tweet);
	this.tweet.input.onUp.add(this.buttonTweet, this);
}


SuperLumberjackSyrupChug.GameOver.displayVictor = function() {
	var lumberjackName = "";
	var numFrames = 0;
	switch( this.winner ) {
		case 1:
			lumberjackName = "paul";
			numFrames = 4;
			break;
		case 2:
			lumberjackName = "gustave";
			numFrames = 6;
			break;
		case 3:
			lumberjackName = "bjorn";
			numFrames = 6;
			break;
		case 4:
			lumberjackName = "fried";
			numFrames = 6;
			break;
		case 5:
			lumberjackName = "big-jim";
			numFrames = 4;
			break;
		case 6:
			lumberjackName = "luther";
			numFrames = 6;
			break;
		case 7:
			lumberjackName = "pierre";
			numFrames = 6;
			break;
		case 8:
			lumberjackName = "magnus";
			numFrames = 4;
			break;
		default:
			lumberjackName = "paul";
			numFrames = 0;
			break;
	}

	this.victorSprite = new Kiwi.GameObjects.Sprite( this, this.textures["select-"+lumberjackName], 94, 45);
	var frames = [];
	for(var i = 0;  i < numFrames; i++) {
		frames[i] = i;
	}
	this.victorSprite.animation.add('default', frames, 0.1, true, true, true );
	// Stupid thing will always play all the frames so MANUAL OVERRIDE
	this.victorSprite.animation.currentAnimation._sequence.cells = frames;
	this.addChild(this.victorSprite);
}


SuperLumberjackSyrupChug.GameOver.configWin = function() {
	// "You Won" logo
	this.youWon = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-you-won"], 19, 6);
	this.youWon.animation.add('default', [0,1], 0.05, true, true);
	this.addChild(this.youWon);

	// "Next Round" button
	this.nextRound = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-next-round"], 44, 103);
	this.nextRound.animation.add('default', [1,0], 0.05, true, true);
	this.addChild(this.nextRound);
	this.nextRound.input.onUp.add(this.buttonReplay, this);
}


SuperLumberjackSyrupChug.GameOver.configLose = function() {
	// "You Lost" logo
	this.youLost = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-you-lost"], 19, 6);
	this.youLost.animation.add('default', [0,1], 0.05, true, true);
	this.addChild(this.youLost);

	// "Try Again" button
	this.tryAgain = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-try-again"], 44, 103);
	this.tryAgain.animation.add('default', [1,0], 0.05, true, true);
	this.addChild(this.tryAgain);
	this.tryAgain.input.onUp.add(this.buttonReplay, this);
}


SuperLumberjackSyrupChug.GameOver.buttonQuit = function() {
	this.game.states.switchState("Intro");
}


SuperLumberjackSyrupChug.GameOver.buttonTweet = function() {
	// Insert social media here
}


SuperLumberjackSyrupChug.GameOver.buttonReplay = function() {
	this.game.states.switchState('Play', null, null, { choosen: this.player1 });
}