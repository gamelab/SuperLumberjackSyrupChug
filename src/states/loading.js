
var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Loading = new KiwiLoadingScreen('Loading', 'Intro', 'assets/img/loading/');

SuperLumberjackSyrupChug.Loading.preload = function () {

    //Add the tournament manager to the game
    this.game.tournament = new SuperLumberjackSyrupChug.Tournament( this.game );

    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);

    //Background
    this.addImage('background', 'assets/img/trees.png');
    
    //Main Menu
    this.addSpriteSheet('title', 'assets/img/main-menu/title.png', 149, 540 / 6);
    this.addSpriteSheet('play', 'assets/img/main-menu/play-button.png', 73, 80 / 4);
    this.addSpriteSheet('play-text', 'assets/img/main-menu/play-button-text.png', 73, 40 / 2);

    //Additional Buttons
    this.addSpriteSheet('leaderboard', 'assets/img/main-menu/leaderboard.png', 44 / 2, 20);
    this.addSpriteSheet('sound', 'assets/img/main-menu/sound.png', 44 / 2, 20);


    //Characters Select
    this.addSpriteSheet('select-paul', 'assets/img/character-select/paul.png', 172 / 4, 102 / 2);
    this.addSpriteSheet('select-gustave', 'assets/img/character-select/gustave.png', 258 / 6, 102 / 2);
    this.addSpriteSheet('select-bjorn', 'assets/img/character-select/bjorn.png', 258 / 6, 102 / 2);
    this.addSpriteSheet('select-fried', 'assets/img/character-select/friedrich.png', 258 / 6, 102 / 2);
    this.addSpriteSheet('select-big-jim', 'assets/img/character-select/bigjim.png', 172 / 4, 102 / 2);
    this.addSpriteSheet('select-luther', 'assets/img/character-select/luther.png', 258 / 6, 102 / 2);
    this.addSpriteSheet('select-pierre', 'assets/img/character-select/pierre.png', 258 / 6, 102 / 2);
    this.addSpriteSheet('select-magnus', 'assets/img/character-select/magnus.png', 172 / 4, 102 / 2);


    //Select Screen Button
    this.addSpriteSheet('select', 'assets/img/character-select/select-your-lumberjack.png', 173, 64 / 8);
    this.addSpriteSheet('continue', 'assets/img/character-select/continue.png', 69, 32 / 4);


    // Game Over Assets
    this.addSpriteSheet( 'gameover-next-round', 'assets/img/gameover/NEXT_ROUND.png', 130, 38 / 2);
    this.addImage( 'gameover-quit', 'assets/img/gameover/QUIT.png' );
    this.addSpriteSheet( 'gameover-try-again', 'assets/img/gameover/TRY_AGAIN.png', 130, 38 / 2);
    this.addImage( 'gameover-tweet', 'assets/img/gameover/TWEET.png' );
    this.addSpriteSheet( 'gameover-you-lost', 'assets/img/gameover/YOU_LOST.png', 176, 52 / 2);
    this.addSpriteSheet( 'gameover-you-won', 'assets/img/gameover/YOU_WON.png', 176, 52 / 2);

    //In Game 
    this.addImage('chug', 'assets/img/in-game/chug.png');
    this.addImage('ready', 'assets/img/in-game/ready.png');
    this.addImage('table', 'assets/img/in-game/table.png');
    this.addImage('tap-to-chug', 'assets/img/in-game/tap-to-chug.png');
    this.addSpriteSheet('numbers', 'assets/img/in-game/numbers.png', 120 / 10, 13);


    //Progress Bar
    this.addImage('syrup-level', 'assets/img/in-game/syrup-level.png');
    this.addImage('oxygen-level', 'assets/img/in-game/oxygen-level.png');
    this.addImage('progress-bar', 'assets/img/in-game/progress-bar.png');
    this.addSpriteSheet('pause-button', 'assets/img/in-game/pause-button.png', 23, 42 / 2);


    //In Game Characters
    this.addSpriteSheet('ingame-paul', 'assets/img/in-game/chars/paul.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-gustave', 'assets/img/in-game/chars/gustave.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-bjorn', 'assets/img/in-game/chars/bjorn.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-fried', 'assets/img/in-game/chars/friedrich.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-big-jim', 'assets/img/in-game/chars/bigjim.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-luther', 'assets/img/in-game/chars/luther.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-pierre', 'assets/img/in-game/chars/pierre.png', 184 / 2, 321 / 3);
    this.addSpriteSheet('ingame-magnus', 'assets/img/in-game/chars/magnus.png', 184 / 2, 321 / 3);


    //Champ assets here...


    //Sounds
    this.addAudio('button', 'assets/sounds/ButtonPush_Effect.mp3');
    this.addAudio('countdown', 'assets/sounds/Countdown_Gamescreen.mp3');
    this.addAudio('game-loop', 'assets/sounds/GameplayLoop_Gamescreen.mp3');
    this.addAudio('gulping', 'assets/sounds/GulpingSound_Effect.mp3');
    this.addAudio('title-loop', 'assets/sounds/Loop_TitleScreen.mp3');
    this.addAudio('loser', 'assets/sounds/Loser_Effect.mp3');
    this.addAudio('outOfBreath', 'assets/sounds/OutofBreath_Effect.mp3');
    this.addAudio('winner', 'assets/sounds/Winner_Effect.mp3');
    this.addAudio('select-loop', 'assets/sounds/SelectScreen_Loop.mp3');
    this.addAudio('final-loop', 'assets/sounds/FinalScreen_Loop.mp3');

};
