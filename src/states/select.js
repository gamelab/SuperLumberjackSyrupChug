var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.Select = new Kiwi.State('Select');

SuperLumberjackSyrupChug.Select.create = function () {

	//this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
	//	this.addChild(this.background);

	this.game.audioMan.playSelectTrack();

	//Choose
	this.select = new Kiwi.GameObjects.Sprite(this, this.textures.select, 0, 5);
	this.select.x = ( this.game.stage.width - this.select.width ) * 0.5;
	this.select.animation.add('default', [0,1,2,3,4,5,6,7], 0.05, true, true);
	this.addChild( this.select );

	this.continue = new Kiwi.GameObjects.Sprite(this, this.textures.continue, 0, 5);
	this.continue.x = ( this.game.stage.width - this.continue.width ) * 0.5;
	this.continue.animation.add('default', [0,1,2,3], 0.05, true, true);
	this.continue.visible = false;
	this.addChild( this.continue );

	this.continue.input.onUp.add( this.proceed, this );

	this.selectedLumberjack = null;
	this.spawnCharacters();

}

SuperLumberjackSyrupChug.Select.spawnCharacters = function() {

	var firstHeight = this.select.y + this.select.height + 5;

	this.paul = this.createLumberjack( this.textures['select-paul'], 10, firstHeight, 1 );
	this.gustave = this.createLumberjack( this.textures['select-gustave'], this.paul.x + this.paul.width + 10, firstHeight, 2 );
	this.bjorn = this.createLumberjack( this.textures['select-bjorn'], this.gustave.x + this.gustave.width + 10, firstHeight, 3 );
	this.fred = this.createLumberjack( this.textures['select-fried'], this.bjorn.x + this.bjorn.width + 10 , firstHeight, 4 );

	var secondHeight = firstHeight + this.paul.height + 2;

	this.bigJim = this.createLumberjack( this.textures['select-big-jim'], this.paul.x, secondHeight, 5 );
	this.luther = this.createLumberjack( this.textures['select-luther'], this.gustave.x, secondHeight, 6 );
	this.pierre = this.createLumberjack( this.textures['select-pierre'], this.bjorn.x, secondHeight, 7 );
	this.magnus = this.createLumberjack( this.textures['select-magnus'], this.fred.x, secondHeight, 8 );

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

	this.game.audioMan.playButton();

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
		this.game.audioMan.playButton();
		this.game.states.switchState('Play', null, null, { choosen: this.selectedLumberjack.id })
	}

}