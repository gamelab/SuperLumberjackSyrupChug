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