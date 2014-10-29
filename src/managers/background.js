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
