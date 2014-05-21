var body = document.body, html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

var timer = 0;
var oldTimer = 0;

var growthCoefficient = .3;

var stage = new Kinetic.Stage({
	container: 'main',
	width: window.innerWidth,
	height: window.innerHeight
});

var layer = new Kinetic.Layer({
	listening: false	
});
var clickLayer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: window.innerWidth,
	height: window.innerHeight,
	fill: 'white',
	opacity: 0,
	strokeEnabled: false
});		

clickLayer.add(rect);
stage.add(layer);
stage.add(clickLayer);

var anim = new Kinetic.Animation(function(frame) {
	update(layer, frame);
}, layer);

anim.start();

setInterval(function(){
	timer += 1;
}, 3000);

stage.on('click', function(){
	console.log('You clicked me!');
	var mousePos = stage.getMousePosition();
    addCircle(layer, mousePos.x, mousePos.y);
});

//*---------------ANIMATION FUNCTIONS-----------------*//
function update(layer, frame){
	if(layer.getChildren().length > 10){ //the layer has been filled up
		layer.getChildren()[0].destroy();
	}
	else if(timer > oldTimer){ //is the time up?
		oldTimer = timer; //reset the timer
		(function(){
			addCircle(layer, getRandomInt(1, window.innerWidth), getRandomInt(1, window.innerHeight));
		}());
	}
	
	for(var i=0; i < layer.getChildren().length; i++){ //for every circle
		layer.getChildren()[i].setRadius(layer.getChildren()[i].getRadius() + growthCoefficient);
		layer.getChildren()[i].setFillRadialGradientEndRadius(layer.getChildren()[i].getFillRadialGradientEndRadius() + growthCoefficient);
		
		if (layer.getChildren()[i].getOpacity() < 0.009){
			layer.getChildren()[i].destroy();
		}
		else {
			layer.getChildren()[i].setOpacity(layer.getChildren()[i].getOpacity() - 0.001);
		}
	}
}
function addCircle(layer, posX, posY) {
	var circle = new Kinetic.Circle({
		x: posX,
		y: posY,
		radius: getRandomInt(20, 70),
		fillRadialGradientStartPoint: 0,
		fillRadialGradientStartRadius: 0,
		fillRadialGradientEndPoint: 0,
		fillRadialGradientEndRadius: 70,
		fillRadialGradientColorStops: [0, getRandomColor(), getRandomArbitrary(0.1, 0.5), getRandomColor(), getRandomArbitrary(0.5, 1), getRandomColor()],
		strokeEnabled: false
	});
	layer.add(circle);
}

//*------------------HELPER FUNCTIONS----------------*//

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}