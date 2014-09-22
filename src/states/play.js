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

  // Create background
  this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
  this.addChild(this.background);

  //Table
  this.table = new Kiwi.GameObjects.StaticImage(this, this.textures.table, 0, this.game.stage.height);
  this.table.y -= this.table.height;
  this.addChild( this.table );

  
  // Create and connect player 1
  // This is the player sitting at this computer
  if(typeof chosenPlayer !== "number") {
    chosenPlayer = 1;
  }
  this.player1 = new SuperLumberjackSyrupChug.Player( this, chosenPlayer );
  this.addChild(this.player1);

  // Create and connect player 2
  // In multiplayer, this will be connectcted to a server and another player
  var randomAI = Math.floor(Math.random() * 8 + 1);
  this.player2 = new SuperLumberjackSyrupChug.Player( this, randomAI );
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

SuperLumberjackSyrupChug.Play.update = function() {
  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  if(this.started) {
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
  this.player1.chug();  
  this.lastTapTime = this.game.time.now();

}
