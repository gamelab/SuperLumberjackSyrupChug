
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
