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
