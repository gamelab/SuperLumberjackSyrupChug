var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Audio = function(game) {

	this.game = game;
	this.currentBackgroundTrack = null;

	//Looping Background Track
	this.titleTrack = new Kiwi.Sound.Audio(this.game, 'title-loop', 0.8, true);
	this.selectTrack = new Kiwi.Sound.Audio(this.game, 'select-loop', 0.8, true);
	this.gameTrack = new Kiwi.Sound.Audio(this.game, 'game-loop', 0.6, true);
	this.loserTrack = new Kiwi.Sound.Audio(this.game, 'loser', 0.8, true);
	this.winnerTrack = new Kiwi.Sound.Audio(this.game, 'winner', 0.8, true);
	this.finalTrack = new Kiwi.Sound.Audio(this.game, 'final-loop', 0.8, true);

	this.button = new Kiwi.Sound.Audio(this.game, 'button', 0.8, false);
	this.countDown = new Kiwi.Sound.Audio(this.game, 'countdown', 0.8, false);

	this.gameTrackTween = this.game.tweens.create(this.gameTrack);

}

SuperLumberjackSyrupChug.Audio.prototype.stopBackgroundTrack = function() {
	if(this.currentBackgroundTrack !== null) {
		this.currentBackgroundTrack.stop();
	}
}

SuperLumberjackSyrupChug.Audio.prototype.playTitleTrack = function() {
	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.titleTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playSelectTrack = function() {
	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.selectTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playGameTrack = function() {

	this.gameTrack.volume = 0.6;

	this.stopBackgroundTrack();

	this.currentBackgroundTrack = this.gameTrack;
	this.currentBackgroundTrack.play();
}

SuperLumberjackSyrupChug.Audio.prototype.playLoserTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop()
		this.gameTrackTween.onComplete(function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.loserTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({ volume: 0 }, 1000 );
		this.gameTrackTween.start();
	
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.loserTrack;
		this.currentBackgroundTrack.play();

	}

}

SuperLumberjackSyrupChug.Audio.prototype.playFinalTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop();
		this.gameTrackTween.onComplete( function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.finalTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({volume:0}, 1000);
		this.gameTrackTween.start();
		
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.finalTrack;
		this.currentBackgroundTrack.play();

	}

};

SuperLumberjackSyrupChug.Audio.prototype.playWinnerTrack = function() {

	if(this.gameTrack.isPlaying) {
		this.gameTrackTween.stop()
		this.gameTrackTween.onComplete(function() {

			this.stopBackgroundTrack();
			this.currentBackgroundTrack = this.winnerTrack;
			this.currentBackgroundTrack.play();

		}, this);
		this.gameTrackTween.to({ volume: 0 }, 1000 );
		this.gameTrackTween.start();
	
	} else {
		this.stopBackgroundTrack();
		this.currentBackgroundTrack = this.winnerTrack;
		this.currentBackgroundTrack.play();

	}

}

SuperLumberjackSyrupChug.Audio.prototype.playButton = function() {
	this.button.play('default', true);
}

SuperLumberjackSyrupChug.Audio.prototype.playCountDown = function() {
	this.countDown.play('default', true);
}
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Background = function( game ) {

	this.game = game;

	this.backgrounds = [
		'morning-trees',
		'noon-trees',
		'night-trees'
	];

	this.currentBackground = this.game.rnd.pick( this.backgrounds );

};

SuperLumberjackSyrupChug.Background.prototype.create = function(state) {

	var background = new Kiwi.GameObjects.StaticImage(state, state.textures[this.currentBackground], 0, 0);
	return background;

};

SuperLumberjackSyrupChug.Background.prototype.next = function() {

	var index = this.backgrounds.indexOf(this.currentBackground);
	index++;

	if(index >= this.backgrounds.length) {
		index = 0;
	}

	this.currentBackground = this.backgrounds[index];

};

var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Player = function(state, character) {

	Kiwi.Group.call(this, state);

	// Create graphics and add to state
	this.characterNumber = character;
	this.character = new SuperLumberjackSyrupChug.PlayerModel( this.state, 
		1 * this.game.size.scale, 
		15* this.game.size.scale, character);
	this.addChild( this.character );


	//Sounds
	this.chockingSound = new  Kiwi.Sound.Audio(this.game, 'outOfBreath', 1, false);
	this.glupingSound = new  Kiwi.Sound.Audio(this.game, 'gulping', 1, false);
	this.winSound = new Kiwi.Sound.Audio(this.game, 'winner', 1, false);
	this.loseSound = new Kiwi.Sound.Audio(this.game, 'loser', 1, false);


	// Nice temp primitive bars

    this.bar = new Kiwi.GameObjects.StaticImage(state, state.textures['progress-bar'], 
    	5 * this.game.size.scale, 
    	5 * this.game.size.scale);
    this.addChild(this.bar);

    this.syrupLevel = new Kiwi.GameObjects.StaticImage(state, state.textures['syrup-level'], 
    	6 * this.game.size.scale,
    	6 * this.game.size.scale);
    this.syrupLevel.anchorPointX = 0;
    this.addChild(this.syrupLevel);

    this.oxygenLevel = new Kiwi.GameObjects.StaticImage(state, state.textures['oxygen-level'], 
    	6 * this.game.size.scale, 
    	6 * this.game.size.scale + this.syrupLevel.height);
    this.oxygenLevel.anchorPointX = 0;
    this.addChild(this.oxygenLevel);

	// Underbar
	// Stomach
	// Mouth
	// Choke
	// Lungs

	// Init esophagus
	this.stomach = 0;
	this.stomachMax = 100;
	this.jugChug = 1;
	this.mouth = 0;
	this.mouthCapacity = 30;
	this.mouthSwallow = 0.1;
	this.lungOxygen = 100;
	this.lungCapacity = 100;
	this.lungConsumption = 1;
	this.lungRecharge = 1;
	this.chokePenalty = 20;
	this.choking = false;
	this.chokeLeft = 0;
	this.chokeRecovery = 0.5;

	// AI parameters
	this.isEnemy = false;
	this.aiChugRate = 0.05;
	this.aiVariation = 0.03;
	this.aiVariationFreq = 0.01;
	this.aiVariationPhase = 0.0;
	this.aiChugProgress = 0.0;
	this.aiChugIndex = 0.0;
}

Kiwi.extend( SuperLumberjackSyrupChug.Player, Kiwi.Group );

SuperLumberjackSyrupChug.Player.prototype.chug = function() {
	// Runs per tap
	if(!this.choking) {
		this.mouth += this.jugChug;
		this.character.animation.play('drink', true);
		this.glupingSound.play();
	}
}


SuperLumberjackSyrupChug.Player.prototype.run = function() {
	// Runs per frame
	this.digest();

	this.render();
}

SuperLumberjackSyrupChug.Player.prototype.digest = function() {
	var rate = this.state.game.time.rate;
	var mouthAndStomachMax = this.stomach + this.mouth;

	// Swallow excess syrup beyond maximum mouth capacity
	if(this.stomach < mouthAndStomachMax - this.mouthCapacity) {
		this.stomach = Math.max(0, mouthAndStomachMax - this.mouthCapacity);
	}

	// Swallow at fixed rate
	this.stomach = Math.min(mouthAndStomachMax, this.stomach + this.mouthSwallow * rate);
	this.mouth = Math.max(0, this.mouth - this.mouthSwallow);

	// Check victory
	if(this.stomachMax <= this.stomach) {
		this.win();
	}

	// Run oxygenation in lungs
	if(!this.choking) {
		if(this.mouth <= 0) {
			// That is, mouth is empty and we can breathe
			this.lungOxygen = Math.min(this.lungCapacity, this.lungOxygen + this.lungRecharge * rate);
		}
		else {
			// That is, we cannot breathe and lose oxygen
			this.lungOxygen -= this.lungConsumption * rate;
		}
	}
	else {
		this.chokeLeft -= this.chokeRecovery * rate;
		if(this.chokeLeft <= 0) {
			this.choking = false;
			this.character.animation.play('idle');
		}
	}

	// Check choke
	if(this.lungOxygen < 0  &&  !this.choking) {
		this.choking = true;
		this.chokeLeft = this.chokePenalty;
		this.lungOxygen = 0;
		// Spit out syrup
		this.mouth = 0;
	}
}

SuperLumberjackSyrupChug.Player.prototype.render = function() {


	// Stomach
	this.syrupLevel.scaleX = Math.min(1, Math.max( this.stomach / this.stomachMax, 0));


	// Lungs
	this.oxygenLevel.scaleX = Math.min(1, Math.max( this.lungOxygen / this.lungCapacity, 0));

	// Choke
	if(this.choking) {
		this.character.animation.play('choke', false);
		this.chockingSound.play();
	}
}

SuperLumberjackSyrupChug.Player.prototype.win = function() {
	// Fanfare
	if(this.isEnemy) {
		this.loseSound.play();
	}
	else {
		this.winSound.play();
	}

	var victoryConfig = {};
	victoryConfig.enemyWon = this.isEnemy;
	victoryConfig.winner = this.characterNumber;
	victoryConfig.player1 = this.state.player1.characterNumber;
	this.game.states.switchState("GameOver", null, null, victoryConfig );
}

SuperLumberjackSyrupChug.Player.prototype.runAI = function() {
	
	this.aiChugIndex += this.state.game.time.rate;
	this.aiChugProgress += this.aiChugRate + Math.sin(this.aiChugIndex * this.aiVariationFreq + this.aiVariationPhase) * this.aiVariation;
	if( 1 <= this.aiChugProgress) {
		this.aiChugProgress -= 1.0;
		this.chug();
	}
}
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};


SuperLumberjackSyrupChug.PlayerModel = function(state, x, y, choice) {

	var texture = null;
	switch(choice) {
		case 1:
		default:
			texture = state.textures['ingame-paul'];
			break;
		case 2:
			texture = state.textures['ingame-gustave'];
			break;
		case 3:
			texture = state.textures['ingame-bjorn'];
			break;
		case 4:
			texture = state.textures['ingame-fried'];
			break;
		case 5:
			texture = state.textures['ingame-big-jim'];
			break;
		case 6:
			texture = state.textures['ingame-luther'];
			break;
		case 7:
			texture = state.textures['ingame-pierre'];
			break;
		case 8:
			texture = state.textures['ingame-magnus'];
			break;
	}

	Kiwi.GameObjects.Sprite.call( this, state, texture, x, y);

	this.animation.add('idle', [0,1], 0.1, true, true);
	this.animation.add('choke', [4,5], 0.1, true);
	var anim = this.animation.add('drink', [2,3, 2,3, 2,3], 0.1, false);

	anim.onStop.add( function() {
		this.animation.play('idle');
	}, this );

}


Kiwi.extend( SuperLumberjackSyrupChug.PlayerModel, Kiwi.GameObjects.Sprite );
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.SizeManager = function( game ) {

	this.game = game;

	this.gameSizes = [
		{
			x: 222,
			y: 125,
			scale: 1
		},
		{
			x: 444,
			y: 250,
			scale: 2
		},
		{
			x: 888,
			y: 500,
			scale: 4
		}
	];

	//Choose the largest size 
	this.choosenSize = this.gameSizes[2];

	//Detect the windows width/height and choose the right size.
	var len = this.gameSizes.length;
	while(len--) {

		//If the width and height of the current size is still larger than the windows.
		//The choose that size.
		if( window.innerHeight < this.gameSizes[len].y && window.innerWidth < this.gameSizes[len].x ) {
			this.choosenSize = this.gameSizes[len];
		}

	}

};

Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "width", {
    
    get: function () {
        return this.choosenSize.x;
    },
    
    enumerable: true,
    
    configurable: true

});

Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "height", {
    
    get: function () {
        return this.choosenSize.y;
    },
    
    enumerable: true,
    
    configurable: true

});


Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "scale", {
    
    get: function () {
        return this.choosenSize.scale;
    },
    
    enumerable: true,
    
    configurable: true

});



Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "folder", {
    
    get: function () {
        return 'assets/img/' + this.choosenSize.x + 'x' + this.choosenSize.y + '/';
    },
    
    enumerable: true,
    
    configurable: true

});
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Tournament = function( game ) {

	this.game = game;

	this.reset();
};

SuperLumberjackSyrupChug.Tournament.prototype.reset = function() {

	this.player = null;

	this.currentOpponent = null;

	this.opponents = [1, 2, 3, 4, 5, 6, 7, 8];

};


SuperLumberjackSyrupChug.Tournament.prototype.start = function( player ) {

	this.reset();

	//See if that player is valid
	var index = this.opponents.indexOf( player );

	if( index !== -1 ) { 

	 	this.player = player;
	 	this.opponents.splice(index, 1);

	 	return true;
	 } 

	 return false;
};


SuperLumberjackSyrupChug.Tournament.prototype.opponentBeaten = function() {

	//Remove the current opponent, if there is one.
	if( this.currentOpponent ) {

		var index = this.opponents.indexOf(this.currentOpponent);
		if(index !== -1) {
			this.opponents.splice( this.opponents.indexOf(this.currentOpponent), 1 );
		}

	}

};


SuperLumberjackSyrupChug.Tournament.prototype.finished = function() {

	//If there are opponents left, then the tourn has not been completed.
	if( this.opponents.length > 0 ) { 
		return false;
	} else {
		return true;
	}

};


SuperLumberjackSyrupChug.Tournament.prototype.nextOpponent = function() {

	//See if there arent any opponents left
	if( !this.finished() ) { 

		//Randomly choose the next opponent
		this.currentOpponent = this.game.rnd.pick( this.opponents );
		return true;
	} else {

		return false;
	}

};

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


	this.game.input.onUp.remove( this.processInput, this);
	this.game.fileStore.removeFile('fb-button');
	this.game.fileStore.removeFile('no-thanks');

};
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
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Intro = new Kiwi.State('Intro');

SuperLumberjackSyrupChug.Intro.create = function () {

	this.game.stage.color = '000000';
	this.game.audioMan.playTitleTrack();


	this.background = this.game.background.create( this );
	this.addChild(this.background);


	this.title = new Kiwi.GameObjects.Sprite(this, this.textures.title, 5 * this.game.size.scale, 5 * this.game.size.scale);
	this.title.x = Math.round(this.game.stage.width * 0.5 - this.title.width * 0.5);
	this.title.animation.add('default', [0,1,2,3,4,5], 0.05, true, true);
	this.addChild(this.title);


	this.play = new Kiwi.GameObjects.Sprite(this, this.textures.play, Math.round(this.title.x), 0);
	this.play.y = Math.round(this.game.stage.height - this.play.height) - 5 * this.game.size.scale;
	this.play.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.addChild(this.play);


	this.playText = new Kiwi.GameObjects.Sprite( this, this.textures['play-text'], Math.round(this.play.x), Math.round(this.play.y));
	this.addChild(this.playText);

	this.playText.input.onEntered.add(function() {
		this.cellIndex = 1;
	}, this.playText);
	this.playText.input.onLeft.add(function() {
		this.cellIndex = 0;
	}, this.playText);
	this.playText.input.onUp.add(function() {
		this.cellIndex = 0;
	}, this.playText);
	this.playText.input.onDown.add(function() {
		this.cellIndex = 1;
	}, this.playText);


	this.sound = new Kiwi.GameObjects.Sprite(this, this.textures.sound, 0, Math.round(this.play.y));
	this.sound.x = Math.round(this.title.x + this.title.width - this.sound.width);
	this.sound.input.onUp.add(this.toggleSound, this);
	this.addChild(this.sound);

	if(this.game.audio.mute) {
		this.sound.cellIndex = 1;
	}

	this.play.input.onUp.add(this.selectCharacter, this);

}


SuperLumberjackSyrupChug.Intro.selectCharacter = function() {
	this.game.audioMan.playButton();
	this.game.states.switchState('Select');
}


SuperLumberjackSyrupChug.Intro.toggleSound = function() {

	this.game.audioMan.playButton();

	if(this.game.audio.mute) {
		this.game.audio.mute = false;
		this.sound.cellIndex = 0;
	} else {
		this.game.audio.mute = true;
		this.sound.cellIndex = 1;
	}

}

var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Loading = new KiwiLoadingScreen('Loading', 'Splash', 'assets/img/loading/');

SuperLumberjackSyrupChug.Loading.preload = function () {

    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);

    //Splash Screen
    this.addImage('burns', 'assets/img/splash/burns.png');

    //Facebook
    this.addImage('fb-button', this.game.size.folder+ 'facebook/FB-button.png');
    this.addImage('no-thanks', this.game.size.folder+ 'facebook/nothanks.png');

    //Background
    this.addImage('morning-trees', this.game.size.folder + 'background/morning.png');
    this.addImage('noon-trees', this.game.size.folder + 'background/noon.png');
    this.addImage('night-trees', this.game.size.folder + 'background/night.png');
    
    //Main Menu
    this.addSpriteSheet('title', this.game.size.folder + 'main-menu/title.png', 
        149 * this.game.size.scale, (540  * this.game.size.scale) / 6);
    this.addSpriteSheet('play', this.game.size.folder + 'main-menu/play-button.png', 
        73 * this.game.size.scale, (80  * this.game.size.scale) / 4);
    this.addSpriteSheet('play-text', this.game.size.folder + 'main-menu/play-button-text.png', 
        73 * this.game.size.scale, (40 * this.game.size.scale) / 2);

    //Additional Buttons
    this.addSpriteSheet('leaderboard', this.game.size.folder + 'main-menu/leaderboard.png', 
        (44 * this.game.size.scale) / 2, 20 * this.game.size.scale);
    this.addSpriteSheet('sound', this.game.size.folder + 'main-menu/sound.png', 
        (44 * this.game.size.scale) / 2, 20 * this.game.size.scale);


    //Characters Select
    this.addSpriteSheet('select-paul', this.game.size.folder + 'character-select/paul.png', 
        (172 * this.game.size.scale) / 4, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-gustave', this.game.size.folder + 'character-select/gustave.png', 
        (258 * this.game.size.scale) / 6, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-bjorn', this.game.size.folder + 'character-select/bjorn.png', 
        (258 * this.game.size.scale) / 6, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-fried', this.game.size.folder + 'character-select/friedrich.png', 
        (258 * this.game.size.scale) / 6, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-big-jim', this.game.size.folder + 'character-select/bigjim.png', 
        (172 * this.game.size.scale) / 4, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-luther', this.game.size.folder + 'character-select/luther.png', 
        (258 * this.game.size.scale) / 6, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-pierre', this.game.size.folder + 'character-select/pierre.png', 
        (258 * this.game.size.scale) / 6, (102 * this.game.size.scale) / 2);
    this.addSpriteSheet('select-magnus', this.game.size.folder + 'character-select/magnus.png', 
        (172 * this.game.size.scale) / 4, (102 * this.game.size.scale) / 2);


    //Select Screen Button
    this.addSpriteSheet('select', this.game.size.folder + 'character-select/select-your-lumberjack.png', 
        (173 * this.game.size.scale), (64 * this.game.size.scale) / 8);
    this.addSpriteSheet('continue', this.game.size.folder + 'character-select/continue.png', 
        (69 * this.game.size.scale), (32 * this.game.size.scale) / 4);


    // Game Over Assets
    this.addSpriteSheet( 'gameover-next-round', this.game.size.folder + 'gameover/NEXT_ROUND.png', 
        (130 * this.game.size.scale), (42 * this.game.size.scale) / 2);
    this.addImage( 'gameover-quit', this.game.size.folder + 'gameover/QUIT.png' );
    this.addSpriteSheet( 'gameover-try-again', this.game.size.folder + 'gameover/TRY_AGAIN.png', 
        (130 * this.game.size.scale), (42 * this.game.size.scale) / 2);
    this.addImage( 'gameover-tweet', this.game.size.folder + 'gameover/TWEET.png' );
    this.addSpriteSheet( 'gameover-you-lost', this.game.size.folder + 'gameover/YOU_LOST.png', 
        176 * this.game.size.scale, (56 * this.game.size.scale) / 2);
    this.addSpriteSheet( 'gameover-you-won', this.game.size.folder + 'gameover/YOU_WON.png', 
        176 * this.game.size.scale, (56 * this.game.size.scale) / 2);
    this.addSpriteSheet( 'next-up', this.game.size.folder + 'gameover/nextup.png', 
        30 * this.game.size.scale, (10 * this.game.size.scale) / 2);
    this.addSpriteSheet( 'so-sorry', this.game.size.folder + 'gameover/sosorry.png', 
        30 * this.game.size.scale, (10 * this.game.size.scale) / 2);


    //Champ assets here...
    this.addSpriteSheet('gameover-congratulations', this.game.size.folder + 'champ/congrats.png', 
        (211 * this.game.size.scale), (26 * this.game.size.scale) / 2);
    this.addSpriteSheet('gameover-jug', this.game.size.folder + 'champ/jugs.png', 
        (48 * this.game.size.scale) / 2, 40 * this.game.size.scale);
    this.addImage('gameover-champion', this.game.size.folder + 'champ/champion.png');
    this.addImage('gameover-subtext', this.game.size.folder + 'champ/subtext.png');


    //In Game 
    this.addImage('chug', this.game.size.folder + 'in-game/chug.png');
    this.addImage('ready', this.game.size.folder + 'in-game/ready.png');
    this.addImage('tap-to-chug', this.game.size.folder + 'in-game/tap-to-chug.png');
    this.addSpriteSheet('numbers', this.game.size.folder + 'in-game/numbers.png', 
        (120 * this.game.size.scale) / 10, 13 * this.game.size.scale);


    //Progress Bar
    this.addImage('syrup-level', this.game.size.folder + 'in-game/syrup-level.png');
    this.addImage('oxygen-level', this.game.size.folder + 'in-game/oxygen-level.png');
    this.addImage('progress-bar', this.game.size.folder + 'in-game/progress-bar.png');
    this.addSpriteSheet('pause-button', this.game.size.folder + 'in-game/pause-button.png', 
        23 * this.game.size.scale, (42 * this.game.size.scale) / 2);


    //In Game Characters
    this.addSpriteSheet('ingame-paul', this.game.size.folder + 'in-game/chars/paul.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-gustave', this.game.size.folder + 'in-game/chars/gustave.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-bjorn', this.game.size.folder + 'in-game/chars/bjorn.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-fried', this.game.size.folder + 'in-game/chars/friedrich.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-big-jim', this.game.size.folder + 'in-game/chars/bigjim.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-luther', this.game.size.folder + 'in-game/chars/luther.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-pierre', this.game.size.folder + 'in-game/chars/pierre.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);
    this.addSpriteSheet('ingame-magnus', this.game.size.folder + 'in-game/chars/magnus.png', 
        (188 * this.game.size.scale) / 2, (321 * this.game.size.scale) / 3);



    //Sounds
    var preURL = 'assets/sounds/';

    this.addAudio('button', [preURL + 'ButtonPush_Effect.wav', preURL + 'ButtonPush_Effect.mp3']);
    this.addAudio('countdown', [preURL + 'Countdown_Gamescreen.wav', preURL + 'Countdown_Gamescreen.mp3']);
    this.addAudio('game-loop', [preURL + 'GameplayLoop_Gamescreen.wav', preURL + 'GameplayLoop_Gamescreen.mp3']);
    this.addAudio('gulping', [preURL + 'GulpingSound_Effect.wav', preURL + 'GulpingSound_Effect.mp3']);
    this.addAudio('title-loop', [preURL + 'Loop_TitleScreen.wav', preURL + 'Loop_TitleScreen.mp3']);
    this.addAudio('loser', [preURL + 'Loser_Effect.wav', preURL + 'Loser_Effect.mp3']);
    this.addAudio('outOfBreath', [preURL + 'OutofBreath_Effect.wav', preURL + 'OutofBreath_Effect.mp3']);
    this.addAudio('winner', [preURL + 'Winner_Effect.wav', preURL + 'Winner_Effect.mp3']);
    this.addAudio('select-loop', [preURL + 'SelectScreen_Loop.wav', preURL + 'SelectScreen_Loop.mp3']);
    this.addAudio('final-loop', [preURL + 'FinalScreen_Loop.wav', preURL + 'FinalScreen_Loop.mp3']);

};

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
  this.started = false;
  this.pause = false;

  // Create background
  this.background = this.game.background.create( this );
  this.addChild(this.background);

  //Pause Button
  this.pauseButton = new Kiwi.GameObjects.Sprite(this, this.textures['pause-button'], 0, 5);
  this.pauseButton.x = (this.game.stage.width - this.pauseButton.width) * 0.5;
  this.addChild(this.pauseButton);

  this.pauseButton.input.onEntered.add(function() {
    this.pauseButton.cellIndex = 1;
  }, this);

  this.pauseButton.input.onLeft.add(function() {
    this.pauseButton.cellIndex = 0;
  }, this);

  this.pauseButton.input.onDown.add(function() {
    this.pauseButton.cellIndex = 1;
  }, this);

  this.pauseButton.input.onUp.add(function() {
    this.pauseButton.cellIndex = 0;
    this.pauseGame();
    //Add pause functionality here.
  }, this);


  this.continueButton = new Kiwi.GameObjects.Sprite(this, this.textures['continue'], 0, 0);
  this.continueButton.x = (this.game.stage.width - this.continueButton.width) * 0.5;
  this.continueButton.y = (this.game.stage.height - this.continueButton.height) * 0.5;
  this.addChild(this.continueButton);
  this.continueButton.visible = false;

  this.continueButton.input.onUp.add( function() {
    this.unpauseGame();
  }, this);


  // Create and connect player 1
  // This is the player sitting at this computer
  this.player1 = new SuperLumberjackSyrupChug.Player( this, this.game.tournament.player );
  this.addChild(this.player1);

  // Create and connect player 2
  // In multiplayer, this will be connectcted to a server and another player
  this.player2 = new SuperLumberjackSyrupChug.Player( this, this.game.tournament.currentOpponent );
  this.player2.x = this.game.stage.width;
  this.player2.scaleX = -1;
  this.player2.isEnemy = true;
  this.addChild(this.player2);

  // Create hud elements

  this.tapToChug = new Kiwi.GameObjects.StaticImage(this, this.textures['tap-to-chug'], 0 * this.game.size.scale, 93 * this.game.size.scale);
  this.tapToChug.x = (this.game.stage.width - this.tapToChug.width) * 0.5 + 1;

  this.game.audioMan.stopBackgroundTrack();
  this.countDown();
}

SuperLumberjackSyrupChug.Play.countDown = function() {
  
  this.ready = new Kiwi.GameObjects.StaticImage(this, this.textures['ready'], 0, 40 * this.game.size.scale);
  this.ready.x = (this.game.stage.width - this.ready.width) * 0.5;
  this.ready.transform.scale = 1.25;
  this.ready.alpha = 1;
  this.addChild(this.ready);

  this.chug = new Kiwi.GameObjects.StaticImage(this, this.textures['chug'], 0, 40 * this.game.size.scale);
  this.chug.x = (this.game.stage.width - this.chug.width) * 0.5;
  this.chug.transform.scale = 1.25;
  this.chug.alpha = 1;


  this.chugTween = this.game.tweens.create( this.ready );
  this.chugTween.to({ alpha: 0, scaleX: 0.75, scaleY: 0.75 }, 1000 );
  this.chugTween.start();


  this.game.audioMan.playCountDown();

  setTimeout( this.start.bind(this), 3000);

}

SuperLumberjackSyrupChug.Play.start = function() {

  this.started = true;
  this.game.audioMan.playGameTrack();
  this.game.input.onUp.add( this.tap, this );


  this.chugTween = this.game.tweens.create( this.chug );
  this.chugTween.to({ alpha: 0, scaleX: 0.75, scaleY: 0.75 }, 1000 );
  this.chugTween.start();


  this.addChild( this.chug ); 
  this.addChild( this.tapToChug );
}

SuperLumberjackSyrupChug.Play.pauseGame = function() {

  if(!this.started) return;

  this.prePauseMuteState = this.game.audio.mute;
  this.game.audio.mute = true;

  this.pause = true;
  this.continueButton.visible = true;

  this.background.visible = false;
  this.pauseButton.visible = false;
  this.player1.visible = false;
  this.player2.visible = false;
  this.tapToChug.visible = false;


}

SuperLumberjackSyrupChug.Play.unpauseGame = function() {
  if(this.started && this.continueButton.visible && this.pause) {

    this.game.audio.mute = this.prePauseMuteState;

    this.pause = false;
    this.continueButton.visible = false;

    this.background.visible = true;
    this.pauseButton.visible = true;
    this.player1.visible = true;
    this.player2.visible = true;
    this.tapToChug.visible = true;

  }
}

SuperLumberjackSyrupChug.Play.update = function() {
  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  if(this.started && !this.pause) {
    // Perform AI
    this.player2.runAI();
  }

  // Perform chugodynamics
  this.player1.run();
  this.player2.run();

  // Diagnose stomach

  if( this.lastTapTime + 50 > this.game.time.now() ) {
    this.tapToChug.transform.scale = 1.15;
  } else {
    this.tapToChug.transform.scale = 1;
  }

}

SuperLumberjackSyrupChug.Play.tap = function() {
  if(!this.pause) {
    this.player1.chug();  
    this.lastTapTime = this.game.time.now();
  }
}

SuperLumberjackSyrupChug.Play.shutDown = function() {
  this.game.background.next();
  this.game.input.onUp.remove( this.tap, this );
}

var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Select = new Kiwi.State('Select');

SuperLumberjackSyrupChug.Select.create = function () {

	//this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
	//	this.addChild(this.background);

	this.game.audioMan.playSelectTrack();

	//Choose
	this.select = new Kiwi.GameObjects.Sprite(this, this.textures.select, 0, 5 * this.game.size.scale);
	this.select.x = ( this.game.stage.width - this.select.width ) * 0.5;
	this.select.animation.add('default', [0,1,2,3,4,5,6,7], 0.05, true, true);
	this.addChild( this.select );

	this.continue = new Kiwi.GameObjects.Sprite(this, this.textures.continue, 0, 5 * this.game.size.scale);
	this.continue.x = ( this.game.stage.width - this.continue.width ) * 0.5;
	this.continue.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.continue.visible = false;
	this.addChild( this.continue );

	this.continue.input.onUp.add( this.proceed, this );

	this.selectedLumberjack = null;
	this.spawnCharacters();

}

SuperLumberjackSyrupChug.Select.spawnCharacters = function() {

	var firstHeight = this.select.y + this.select.height + 5 * this.game.size.scale;

	this.paul = this.createLumberjack( this.textures['select-paul'], 10 * this.game.size.scale, firstHeight, 1 );
	this.gustave = this.createLumberjack( this.textures['select-gustave'], this.paul.x + this.paul.width + 10 * this.game.size.scale, firstHeight, 2 );
	this.bjorn = this.createLumberjack( this.textures['select-bjorn'], this.gustave.x + this.gustave.width + 10 * this.game.size.scale, firstHeight, 3 );
	this.fred = this.createLumberjack( this.textures['select-fried'], this.bjorn.x + this.bjorn.width + 10 * this.game.size.scale , firstHeight, 4 );

	var secondHeight = firstHeight + this.paul.height + 2 * this.game.size.scale;

	this.bigJim = this.createLumberjack( this.textures['select-big-jim'], this.paul.x, secondHeight, 5 );
	this.luther = this.createLumberjack( this.textures['select-luther'], this.gustave.x, secondHeight, 6 );
	this.pierre = this.createLumberjack( this.textures['select-pierre'], this.bjorn.x, secondHeight, 7 );
	this.magnus = this.createLumberjack( this.textures['select-magnus'], this.fred.x, secondHeight, 8 );

	this.addChild(this.paul);
	this.addChild(this.gustave);
	this.addChild(this.bjorn);
	this.addChild(this.fred);
	this.addChild(this.bigJim);
	this.addChild(this.luther);
	this.addChild(this.pierre);
	this.addChild(this.magnus);

}

SuperLumberjackSyrupChug.Select.createLumberjack = function(texture, x, y, id) {
	var lumberjack = new Kiwi.GameObjects.Sprite( this, texture, x, y );
	lumberjack.id = id;

	var cellNum = texture.cells.length;
	var cells = [];

	for(var i = 0; i < cellNum / 2; i++) {
		cells.push( i );
	}

	lumberjack.animation.add('active', cells, 0.1, true);
	var cells = [];

	for(var i = cellNum / 2; i < cellNum; i++) {
		cells.push( i );
	}

	lumberjack.animation.add('inactive', cells, 0.1, true, true);
	lumberjack.input.onUp.add(this.selectCharacter, this);

	return lumberjack; 
}


SuperLumberjackSyrupChug.Select.selectCharacter = function(jack) {

	this.game.audioMan.playButton();

	if(this.selectedLumberjack !== null) {
		this.selectedLumberjack.animation.play('inactive');
	}

	this.selectedLumberjack = jack;
	this.selectedLumberjack.animation.play('active');
	this.select.visible = false;
	this.continue.visible = true;

}

SuperLumberjackSyrupChug.Select.proceed = function() {

	if(this.selectedLumberjack !== null && this.game.tournament.start( this.selectedLumberjack.id ) ) {

	  	//Tell the tournament manager we want the next opponent
	  	this.game.tournament.nextOpponent();

		this.game.audioMan.playButton();
		this.game.states.switchState('Play');
	}

}
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
	debug: Kiwi.DEBUG_OFF,
	plugins: ['SocialConnect']
};

var game = new Kiwi.Game('content', 'SuperLumberjackSyrupChug', null, gameOptions);

//Add in the scale manager to calculate the dimensions the game will use.
game.size = new SuperLumberjackSyrupChug.SizeManager( game ); 

//Add all the States we are going to use.
game.states.addState(SuperLumberjackSyrupChug.Loading);
game.states.addState(SuperLumberjackSyrupChug.Intro);
game.states.addState(SuperLumberjackSyrupChug.Select);
game.states.addState(SuperLumberjackSyrupChug.Play);
game.states.addState(SuperLumberjackSyrupChug.GameOver);
game.states.addState(SuperLumberjackSyrupChug.Splash);
game.states.addState(SuperLumberjackSyrupChug.Facebook);

game.states.switchState("Loading");