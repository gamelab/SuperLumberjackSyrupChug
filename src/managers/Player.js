var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Player = function(state) {
	this.state = state;

	// Create graphics and add to state

	// Init esophagus
	this.stomach = 0;
	this.stomachMax = 100;
	this.jugChug = 5;
	this.mouth = 0;
	this.mouthCapacity = 20;
	this.mouthSwallow = 0.5;
	this.lungOxygen = 100;
	this.lungCapacity = 100;
	this.lungConsumption = 1;
	this.lungRecharge = 3;
	this.chokePenalty = 20;
	this.choking = false;
	this.chokeLeft = 0;
}

SuperLumberjackSyrupChug.Player.prototype.chug = function() {
	// Runs per tap
	this.mouth += this.jugChug;
}


SuperLumberjackSyrupChug.Player.prototype.run = function() {
	// Runs per frame

	var rate = this.state.game.rate;
	var mouthAndStomachMax = this.stomach + this.mouth;

	// Swallow excess syrup beyond maximum mouth capacity
	if(this.stomach < mouthAndStomachMax - this.mouthCapacity) {
		this.stomach = mouthAndStomachMax - this.mouthCapacity;
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
		if(0 < this.mouth) {
			// That is, mouth is empty and we can breathe
			this.lungOxygen = Math.min(this.lungCapacity, this.lungOxygen + this.lungRecharge * rate);
		}
		else {
			// That is, we cannot breathe and lose oxygen
			this.lungOxygen -= this.lungConsumption * rate;
		}
	}
	else {
		this.chokeLeft -= rate;
	}

	// Check choke
	if(this.lungOxygen < 0  &&  !this.choking) {
		this.choking = true;
		this.chokeLeft = this.chokePenalty;
		this.lungOxygen = 0;
		// Spit out syrup
		this.mouth = 0;
	}

	//console.log();
}

SuperLumberjackSyrupChug.Player.prototype.win = function() {
	console.log("You win!");
}