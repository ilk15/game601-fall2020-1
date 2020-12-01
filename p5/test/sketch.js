//In setup, we will use this array to store all of our Thing objects. Each object is
//will be an ellipse with a unique width/height, and offset from the center of the screen
let things = []
//This is how many Things we will have. I recommend changing this to a much small number
//(like 5) and seeing if you can sort of understand why it is doing what it is doing.
let numThings = 500

//These are constants that will be used in the Thing's update function (see below)
let freq = 0.01
let amp = 200

//This will also be used in Thing's update function (see below)
let rotation = 0
let rotationSpeed = 0.005

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	//Fill the array with a 'numThings' worth of things. After this for loop, the array will 
	//contain 1000 (numThings) Thing objects. Each will have its own position, and it will
	//know its 'index'. In the Thing's constructor, we will use the index to configure it to
	//have a unique 'phase' (see the constructor)
	for (let i = 0; i < numThings; i++) {
		things[i] = new Thing(i * width/numThings, height/2, i)
	}
	
	//Set the color mode to "Hue, Saturation, Brightness" (HSB) mode. When we use fill, stroke, 
	//or background, we can set each of these values between 0 and 100. In other words, don't
	//think "red, green, blue" but instead think hue (roygbiv), saturation (intensity), and 
	//brightness (how light or dark it is).
	colorMode(HSB, 100)
	noStroke()
}

function draw() {
	background(0)
	
	//Increment the rotation that all 'things' will use (see their update function)
	rotation += rotationSpeed
	
	//Loop through all things and call their update function
	for (let i = 0; i < things.length; i++) {
		things[i].update()
	}
}

class Thing {
	
	//The constructor function is called once when "new Thing" is called in the setup function
	constructor(x, y, i)	{
		this.x = x
		this.y = y
		this.index = i
		//Do some math to 
		this.phase = this.index * PI * 2 / numThings
	}
	
	update() {
		
		//push saves the drawing context of the p5 engine that draws shapes on the screen
		push()
		
		//Move the 'drawing context' to the position of the Thing
		translate(this.x, this.y)
		
		//Compute the dimesnion we want to use for the ellipse. The minimum size is 10. 
		//this.index/things.length gives us a number between 0 and 1 (in other words, it )
		let dim = 10 + this.index/things.length * 200
		
		//Rotate the screen in some way (math...)
		rotate(rotation * sin(this.index))
		
		//Set the color to be a number between 0 and 100 based on the index of the Thing
		fill(this.index/things.length*100, 60, 100)
		
		//Figure out where to draw the shape on the y dimension
		let offsetY = sin(frameCount * freq + this.phase) * amp
		
		//Draw the shape
		ellipse(0, offsetY, dim, dim)
		
		//pop resets the drawing context of the p5 engine that we saved when we called the push
		//function above
		pop()
	}
}
