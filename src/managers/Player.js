var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Player = function(state, character) {

	Kiwi.Group.call(this, state);

	// Create graphics and add to state
	this.characterNumber = character;
	this.character = new SuperLumberjackSyrupChug.PlayerModel( this.state, 1, 15, character);
	this.addChild( this.character );

	//Sounds
	this.chockingSound = new  Kiwi.Sound.Audio(this.game, 'outOfBreath', 1, false);
	this.glupingSound = new  Kiwi.Sound.Audio(this.game, 'gulping', 1, false);
	this.winSound = new Kiwi.Sound.Audio(this.game, 'winner', 1, false);
	this.loseSound = new Kiwi.Sound.Audio(this.game, 'loser', 1, false);


	// Nice temp primitive bars
	var barCanvas = document.createElement("canvas");
	this.barCanvas = barCanvas;
    barCanvas.width = 100;
    barCanvas.height = 10;
    this.barCanvasContext = barCanvas.getContext("2d");
    this.barAtlas = new Kiwi.Textures.SingleImage("barTexture", barCanvas);
    this.state.textureLibrary.add(this.barAtlas);
    
    this.bar = new Kiwi.GameObjects.Sprite(state, state.textures.barTexture, 5, 5);
    this.addChild(this.bar);

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
	this.mouthCapacity = 20;
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
	this.barAtlas.dirty = true;
	var ctx = this.barCanvasContext;
	ctx.clearRect(0,0, this.barCanvas.width, this.barCanvas.height);
	// Stomach
	var stomachBarWidth = this.barCanvas.width * this.stomach / this.stomachMax;
	ctx.fillStyle = "#e01030";
	ctx.fillRect(0,0, stomachBarWidth, this.barCanvas.height );
	// Mouth
	var mouthBarWidth = this.barCanvas.width * this.mouth / this.stomachMax;
	ctx.fillStyle = "#ffc080";
	ctx.fillRect(stomachBarWidth,0, mouthBarWidth,this.barCanvas.height);
	// Lungs
	var lungBarWidth = this.barCanvas.width * this.lungOxygen / this.lungCapacity;

	ctx.clearRect(0,this.barCanvas.height * 0.8, lungBarWidth, this.barCanvas.height * 0.2);
	ctx.fillStyle = "#0080ff";
	ctx.fillRect(0,this.barCanvas.height * 0.8, lungBarWidth, this.barCanvas.height * 0.2);

	// Choke
	if(this.choking) {
		var chokeBarWidth = this.barCanvas.width * this.chokeLeft / this.stomachMax;
		ctx.fillRect(stomachBarWidth - chokeBarWidth, 0, chokeBarWidth, this.barCanvas.height);

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
	this.state.game.states.switchState("GameOver", SuperLumberjackSyrupChug.GameOver, null, victoryConfig );
}

SuperLumberjackSyrupChug.Player.prototype.runAI = function() {
	this.aiChugIndex += this.state.game.time.rate;
	this.aiChugProgress += this.aiChugRate + Math.sin(this.aiChugIndex * this.aiVariationFreq + this.aiVariationPhase) * this.aiVariation;
	if( 1 <= this.aiChugProgress) {
		this.aiChugProgress -= 1.0;
		this.chug();
	}
}