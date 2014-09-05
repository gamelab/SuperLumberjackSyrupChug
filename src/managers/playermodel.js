var SuperLumberjackSyrupChug = SuperLumberjackSyrupChug || {};


SuperLumberjackSyrupChug.PlayerModel = function(state, x, y, choice) {

	var texture = null;
	switch(choice) {
		case 1:
		default:
			texture = state.textures['ingame-paul'];
			break;
		case 2:
			texture = state.textures['ingame-gustave'];
			break;
		case 3:
			texture = state.textures['ingame-bjorn'];
			break;
		case 4:
			texture = state.textures['ingame-fried'];
			break;
		case 5:
			texture = state.textures['ingame-big-jim'];
			break;
		case 6:
			texture = state.textures['ingame-luther'];
			break;
		case 7:
			texture = state.textures['ingame-pierre'];
			break;
		case 8:
			texture = state.textures['ingame-magnus'];
			break;
	}

	Kiwi.GameObjects.Sprite.call( this, state, texture, x, y);

	this.animation.add('idle', [0,1], 0.1, true, true);
	this.animation.add('choke', [4,5], 0.1, true);
	var anim = this.animation.add('drink', [2,3, 2,3, 2,3], 0.1, false);

	anim.onStop.add( function() {
		this.animation.play('idle');
	}, this );

}


Kiwi.extend( SuperLumberjackSyrupChug.PlayerModel, Kiwi.GameObjects.Sprite );