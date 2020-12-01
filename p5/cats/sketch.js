let cats = [];
let numCats = 1000;

function setup() {
	createCanvas(windowWidth, windowHeight);

	noStroke();
	colorMode(HSB, 255);

	// Instantiate all of our Cat objects.
	for (let i = 0; i < numCats; i++) {
		// Computer the simple percentage "progress" we've made toward instantiating all of our cats.
		let percentage = i / numCats;

		// Create a cat, and add it to the array at index i.
		cats[i] = new Cat(percentage);
	}
}

function draw() {
	background(0);

	// Loop through our array of cat objects, and call the update function of each one.
	for (let i = 0; i < cats.length; i++) {
		cats[i].update();
	}
}


class Cat {
	//This is the constructor function. When created each 'new' instance of this
	//class, this function was called. The purpose of the constructor is to initialize
	//the object (i.e. add a bunch of variables to the object).
	//
	//'percentage' is passed in as an argument when we create the Cat object.
	constructor(percentage) {
		//NOTE: The word 'this' refers to the object being instantiated.

		// This will evenly space the Cats from left to right. I.e. when pecentage is 0 x will be 0, when percentage
		// is 1, x will be width, when percentage is 0.5, x will be width/2, and so on.
		this.x = percentage * width;
		this.y = height/2;
		this.velX = random(-3,3);
		this.velY = random(-3,3);
		// Make the size of the object based on the percentage value (recall it is gonna be between 0 and 1)
		this.diameter = 20 + percentage * 300;
		// Make the hue of the object based on the percentage value
		this.h = percentage * 255;
		this.s = 200;
		this.b = 240;
		this.alpha = 255;
		// Make the rate that alpha decreases (in update) based on the percentage value. This will make it so
		// the objects further to the right will fade away quicker than the ones on the left.
		this.alphaRate = percentage * 3;
	}

	//This defines a function 'inside' of the object. This function can be called
	//by writing the <variable object name>.<function name>().
	update() {
		this.x += this.velX; //same thing as: this.x = this.x + this.velX
		this.y += this.velY;

		if (this.x < 0 || this.x > width) {
			this.velX *= -1;
		}
		if (this.y < 0 || this.y > height) {
			this.velY *= -1;
		}

		// Make alpha go down.
		this.alpha -= this.alphaRate;

		// Set the color and alpha (alpha is an optional 4th argument that changes the transparency of the color).
		fill(this.h, this.s, this.b, this.alpha);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
