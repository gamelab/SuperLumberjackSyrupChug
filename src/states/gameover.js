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

		//Is the tournament finished?
		if( this.game.tournament.finished() ) {

			//You won the tournment; champion screen
			this.configChamp();

		} else {

			// You won; config victory screen
			this.configWin();
	  		this.game.tournament.opponentBeaten();

	  	}
	
	}


}


SuperLumberjackSyrupChug.GameOver.displayVictor = function() {
	var lumberjackName = "";
	var numFrames = 0;
	switch( this.winner ) {
		case 1:
			texture = this.textures["select-paul"];
			break;
		case 2:
			texture = this.textures["select-gustave"];
			break;
		case 3:
			texture = this.textures["select-bjorn"];
			break;
		case 4:
			texture = this.textures["select-fried"];
			break;
		case 5:
			texture = this.textures["select-big-jim"];
			break;
		case 6:
			texture = this.textures["select-luther"];
			break;
		case 7:
			texture = this.textures["select-pierre"];
			break;
		case 8:
			texture = this.textures["select-magnus"];
			break;
		default:
			texture = this.textures["select-paul"];
			break;
	}

	this.victorSprite = new Kiwi.GameObjects.Sprite( this, texture, 0, 45);
	this.victorSprite.x = (this.game.stage.width - this.victorSprite.width) * 0.5;

	var cellNum = texture.cells.length;
	var frames = [];

	for(var i = 0;  i < cellNum / 2; i++) {
		frames[i] = i;
	}

	this.victorSprite.animation.add('animate', frames, 0.1, true, true, false );
	this.addChild(this.victorSprite);
}

/**
* -------------------------------- 
*  GameOver screen types.
* --------------------------------
**/

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

	this.game.audioMan.playWinnerTrack();

	this.showQuit();
	this.showTweet( false, true );
	this.displayVictor();
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

	this.game.audioMan.playLoserTrack();

	this.showQuit();
	this.showTweet( false, true );
	this.displayVictor();
}

SuperLumberjackSyrupChug.GameOver.configChamp = function() {

	this.game.audioMan.playFinalTrack();

}


/**
* -------------------------------- 
*  Screen Global Buttons.
* --------------------------------
**/
SuperLumberjackSyrupChug.GameOver.showTweet = function( centerX, centerY ) {
	this.tweet = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-tweet"], 0, 0);
	this.addChild(this.tweet);


	if(centerY) {
		this.tweet.y = Math.floor( (this.game.stage.height - this.tweet.height) / 2 );
	} else {

	}

	if(centerX) {
		this.tweet.x = Math.floor( (this.game.stage.width - this.tweet.width) / 2 );
	} else {
		this.tweet.x = Math.floor( this.game.stage.width - (this.tweet.width + this.tweet.y * 0.3) );
	}

	this.inputMethod = function(x,y) {
		if(this.tweet.box.bounds.contains(x, y) ) {
			this.buttonTweet();
		}
	};

	this.game.input.onUp.add(this.inputMethod, this);
};


SuperLumberjackSyrupChug.GameOver.showQuit = function() {

	this.quit = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-quit"], 0, 0);
	this.quit.y = Math.floor( (this.game.stage.height - this.quit.height) / 2 );
	this.quit.x = Math.floor( this.quit.y * 0.3 );
	
	this.addChild(this.quit);
	this.quit.input.onUp.add(this.buttonQuit, this);

}


/**
* -------------------------------- 
*  Input methods.
* --------------------------------
**/

SuperLumberjackSyrupChug.GameOver.buttonQuit = function() {
	this.game.audioMan.playButton();
	this.game.states.switchState("Intro");
}


SuperLumberjackSyrupChug.GameOver.buttonTweet = function() {
	
	this.game.audioMan.playButton();

	// Insert social media here
    var u        = "",
        text     = "Choose your Lumberjack and faceoff in the stickest Syrup Chugging compentition ever.",
        hashtags = "#syrupchug";

    var path = "http://twitter.com/share?text=" + encodeURIComponent(text) +"&url="+ encodeURIComponent(u) + "&hashtags=" + hashtags
    window.open(path, "_blank", "scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440");

}


SuperLumberjackSyrupChug.GameOver.buttonReplay = function() {
	this.game.audioMan.playButton();
	this.game.states.switchState('Play', null, null, { choosen: this.player1 });
}


SuperLumberjackSyrupChug.GameOver.shutDown = function() {
	this.game.input.onUp.remove(this.inputMethod, this);
}