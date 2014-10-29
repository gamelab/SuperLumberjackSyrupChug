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

  //Tell the tournament manager we want the next opponent
  this.game.tournament.nextOpponent();

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

  this.tapToChug = new Kiwi.GameObjects.StaticImage(this, this.textures['tap-to-chug'], 0, 93);
  this.tapToChug.x = (this.game.stage.width - this.tapToChug.width) * 0.5 + 1;

  this.game.audioMan.stopBackgroundTrack();
  this.countDown();
}

SuperLumberjackSyrupChug.Play.countDown = function() {
  
  this.ready = new Kiwi.GameObjects.StaticImage(this, this.textures['ready'], 0, 40);
  this.ready.x = (this.game.stage.width - this.ready.width) * 0.5;
  this.ready.transform.scale = 1.25;
  this.ready.alpha = 1;
  this.addChild(this.ready);

  this.chug = new Kiwi.GameObjects.StaticImage(this, this.textures['chug'], 0, 40);
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
