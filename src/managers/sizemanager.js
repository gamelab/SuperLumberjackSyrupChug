var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};

SuperLumberjackSyrupChug.SizeManager = function( game ) {

	this.game = game;

	this.gameSizes = [
		{
			x: 222,
			y: 125,
			scale: 1
		},
		{
			x: 444,
			y: 250,
			scale: 2
		},
		{
			x: 888,
			y: 500,
			scale: 4
		}
	];

	//Choose the largest size 
	this.choosenSize = this.gameSizes[2];

	//Detect the windows width/height and choose the right size.
	var len = this.gameSizes.length;
	while(len--) {

		//If the width and height of the current size is still larger than the windows.
		//The choose that size.
		if( window.innerHeight < this.gameSizes[len].y && window.innerWidth < this.gameSizes[len].x ) {
			this.choosenSize = this.gameSizes[len];
		}

	}

	console.log('Size set to: ' + this.choosenSize.x + 'x' + this.choosenSize.y);

};

Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "width", {
    
    get: function () {
        return this.choosenSize.x;
    },
    
    enumerable: true,
    
    configurable: true

});

Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "height", {
    
    get: function () {
        return this.choosenSize.y;
    },
    
    enumerable: true,
    
    configurable: true

});


Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "scale", {
    
    get: function () {
        return this.choosenSize.scale;
    },
    
    enumerable: true,
    
    configurable: true

});



Object.defineProperty( SuperLumberjackSyrupChug.SizeManager.prototype, "folder", {
    
    get: function () {
        return 'assets/img/' + this.choosenSize.x + 'x' + this.choosenSize.y + '/';
    },
    
    enumerable: true,
    
    configurable: true

});