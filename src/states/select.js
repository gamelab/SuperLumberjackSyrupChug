var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Select = new Kiwi.State('Select');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features. 
*  
* Right now we are just switching straight to the PlayState.
*
*/


SuperLumberjackSyrupChug.Select.create = function () {

	//Choose
	this.select = new Kiwi.GameObjects.Sprite(this, this.textures.select, 0, 20);
	this.select.x = ( this.game.stage.width - this.select.width ) * 0.5;
	this.select.animation.add('default', [0,1,2,3,4,5,6,7], 0.05, true, true);
	this.addChild( this.select );

	this.continue = new Kiwi.GameObjects.Sprite(this, this.textures.continue, 0, 20);
	this.continue.x = ( this.game.stage.width - this.continue.width ) * 0.5;
	this.continue.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.continue.visible = false;
	this.addChild( this.continue );

	this.continue.input.onUp.add( this.proceed, this );

	this.selectedLumberjack = null;
	this.spawnCharacters();

}

SuperLumberjackSyrupChug.Select.spawnCharacters = function() {

	var firstHeight = this.select.y + this.select.height + 30;

	this.paul = this.createLumberjack( this.textures.paul, 10, firstHeight, 1 );
	this.gustave = this.createLumberjack( this.textures.gustave, this.paul.x + this.paul.width + 10, firstHeight, 2 );
	this.bjorn = this.createLumberjack( this.textures.bjorn, this.gustave.x + this.gustave.width + 10, firstHeight, 3 );
	this.fred = this.createLumberjack( this.textures.fred, this.bjorn.x + this.bjorn.width + 10 , firstHeight, 4 );

	var secondHeight = firstHeight + this.paul.height + 30;

	this.bigJim = this.createLumberjack( this.textures['big-jim'], this.paul.x, secondHeight, 5 );
	this.luther = this.createLumberjack( this.textures['luther'], this.gustave.x, secondHeight, 6 );
	this.pierre = this.createLumberjack( this.textures['pierre'], this.bjorn.x, secondHeight, 7 );
	this.magnus = this.createLumberjack( this.textures['magnus'], this.fred.x, secondHeight, 8 );

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

	if(this.selectedLumberjack !== null) {
		this.selectedLumberjack.animation.play('inactive');
	}

	this.selectedLumberjack = jack;
	this.selectedLumberjack.animation.play('active');
	this.select.visible = false;
	this.continue.visible = true;

}

SuperLumberjackSyrupChug.Select.proceed = function() {

	if(this.selectedLumberjack !== null) {
		this.game.states.switchState('Play', null, { choosen: this.selectedLumberjack.id })
	}

}