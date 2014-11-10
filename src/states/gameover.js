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
		//You won! Choose the next opponent
	  	this.game.tournament.opponentBeaten();

		//Is the tournament finished?
		if( this.game.tournament.finished() ) {

			//You won the tournment; champion screen
			this.configChamp();

		} else {

  			//Tell the tournament manager we want the next opponent
			this.game.tournament.nextOpponent();

			// You won; config victory screen
			this.configWin();

	  	}
	
	}


}


SuperLumberjackSyrupChug.GameOver.displayChar = function( char, displayNextUp ) {
	var lumberjackName = "";
	var numFrames = 0;
	var texture = null;

	switch( char ) {
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

	this.victorSprite = new Kiwi.GameObjects.Sprite( this, texture, 0, 46 * this.game.size.scale);
	this.victorSprite.x = Math.round((this.game.stage.width - this.victorSprite.width) * 0.5);

	var cellNum = texture.cells.length;
	var frames = [];

	for(var i = 0;  i < cellNum / 2; i++) {
		frames[i] = i;
	}

	this.victorSprite.animation.add('animate', frames, 0.1, true, true, false );
	this.addChild(this.victorSprite);

	if( displayNextUp ) {
		//Next Up
		var texture = this.textures['next-up'];

	} else {
		//So sorry
		var texture = this.textures['so-sorry'];

	}

	this.newText = new Kiwi.GameObjects.Sprite( this, texture );
	this.newText.x = Math.round((this.game.stage.width - this.newText.width) * 0.5);
	this.newText.y = this.victorSprite.y - this.newText.height - 2 * this.game.size.scale;
	this.newText.animation.add('animate', [0,1], 0.1, true, true, false );

	this.addChild(this.newText);


}

/**
* -------------------------------- 
*  GameOver screen types.
* --------------------------------
**/

SuperLumberjackSyrupChug.GameOver.configWin = function() {

	// "You Won" logo
	this.youWon = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-you-won"], 19 * this.game.size.scale, 6 * this.game.size.scale);
	this.youWon.animation.add('default', [0,1], 0.05, true, true);
	this.addChild(this.youWon);

	// "Next Round" button
	this.nextRound = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-next-round"], 44 * this.game.size.scale, 103 * this.game.size.scale);
	this.nextRound.animation.add('default', [1,0], 0.05, true, true);
	this.addChild(this.nextRound);

	this.showQuit();
	this.showTweet( false, true );

	var that = this;
	setTimeout(function() {
		that.nextRound.input.onUp.add(that.buttonReplay, that);
	}, 500);

	this.game.audioMan.playWinnerTrack();
	this.displayChar( this.game.tournament.currentOpponent, true );
}


SuperLumberjackSyrupChug.GameOver.configLose = function() {

	// "You Lost" logo
	this.youLost = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-you-lost"], 20 * this.game.size.scale, 5 * this.game.size.scale);
	this.youLost.animation.add('default', [0,1], 0.05, true, true);
	this.addChild(this.youLost);

	// "Try Again" button
	this.tryAgain = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-try-again"], 44 * this.game.size.scale, 103 * this.game.size.scale);
	this.tryAgain.animation.add('default', [1,0], 0.05, true, true);
	this.addChild(this.tryAgain);

	this.showQuit();
	this.showTweet( false, true );

	var that = this;
	setTimeout(function() {
		that.tryAgain.input.onUp.add(that.buttonReplay, that);
	}, 500);

	this.game.audioMan.playLoserTrack();
	this.displayChar( this.game.tournament.player, false );
}

SuperLumberjackSyrupChug.GameOver.configChamp = function() {

	// Congrats
	this.congrats = new Kiwi.GameObjects.Sprite(this, this.textures['gameover-congratulations'], 0, 2 * this.game.size.scale);
	this.congrats.x = Math.round((this.game.stage.width - this.congrats.width) * 0.5);
	this.congrats.animation.add('default', [1,0], 0.075, true, true);
	this.addChild( this.congrats );

	// Subtext 
	this.subtext = new Kiwi.GameObjects.StaticImage(this, this.textures['gameover-subtext'], 0, 17 * this.game.size.scale);
	this.subtext.x = Math.round((this.game.stage.width - this.subtext.width) * 0.5);
	this.addChild( this.subtext );

	//Create Jugs
	this.jugs = [];
	this.currentJug = 0;
	var x = 11;

	for(var i = 0; i < 8; i++) {
		var jug = new Kiwi.GameObjects.Sprite(this, this.textures['gameover-jug'], 0, 36 * this.game.size.scale);
		jug.x = Math.round(x);
		x += jug.width + 1;
		this.addChild( jug );
		this.jugs.push( jug );

		//Animation
		var anim = jug.animation.add('flash', [1,0], 0.075, false);
		anim.onStop.add( function() {
			this.currentJug++;
			if(this.currentJug >= this.jugs.length) this.currentJug = 0;
			this.jugs[this.currentJug].animation.play('flash');
			this.jugs[this.currentJug].cellIndex = 1;
		}, this);
	}

	this.jugs[0].animation.play('flash');


	// Champion Text
	this.champion = new Kiwi.GameObjects.StaticImage(this, this.textures['gameover-champion'], 0, 56 * this.game.size.scale);
	this.champion.x = (this.game.stage.width - this.champion.width) * 0.5 - 1;
	this.addChild(this.champion);


	this.tryAgain = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-try-again"], 44 * this.game.size.scale, 98 * this.game.size.scale);
	this.addChild(this.tryAgain);

	this.showTweet(true, false);
	this.game.audioMan.playFinalTrack();

	var that = this;
	setTimeout(function() {
		that.tryAgain.input.onUp.add(that.buttonQuit, that);
	}, 500);

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
		this.tweet.y = Math.floor( (this.game.stage.height - this.tweet.height) / 2 ) + 5 * this.game.size.scale;
	} else {
		this.tweet.y = 76;
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

	var that = this;
	setTimeout(function() {
		that.game.input.onUp.add(that.inputMethod, that);
	}, 500);

};


SuperLumberjackSyrupChug.GameOver.showQuit = function() {

	this.quit = new Kiwi.GameObjects.Sprite(this, this.textures["gameover-quit"], 0, 0);
	this.quit.y = Math.floor( (this.game.stage.height - this.quit.height) / 2 ) + 5 * this.game.size.scale;
	this.quit.x = Math.floor( this.quit.y * 0.3 );
	
	this.addChild(this.quit);

	var that = this;
	setTimeout(function() {
		that.quit.input.onUp.add(that.buttonQuit, that);
	}, 500);

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

    var path = "http://twitter.com/share?text=" + encodeURIComponent(text) +"&url="+ encodeURIComponent(u) + "&hashtags=" + hashtags;

    if(typeof Cocoon !== "undefined" && typeof Cocoon.App !== "undefined" && typeof Cocoon.App.openURL !== "undefined") {
    	Cocoon.App.openURL(path);

    } else {
    	window.open(path, "_blank", "scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440");

    }
}


SuperLumberjackSyrupChug.GameOver.buttonReplay = function() {
	this.game.audioMan.playButton();
	this.game.states.switchState('Play', null, null, { choosen: this.player1 });
}


SuperLumberjackSyrupChug.GameOver.shutDown = function() {
	this.game.input.onUp.remove(this.inputMethod, this);
}