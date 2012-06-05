/** Boids is the name space function. Give a hoot, don't pollute! */
var Boids = Boids || {};

/**
	The World object manages the list of Birds, and handles the animation
	loop.
	@param elem The canvas object ID to render onto during the animation loop
	@param options An optional object containing options to use instead of the defaults
*/
Boids.World = function(elem, options)
{
	"use strict";
	
	this.canvas = document.getElementById(elem);
	if (! this.canvas.getContext)
	{
		return false;
	}
	else
	{
		/*
			Set canvas width and height based on real width
			and height of element. Necessary (?) when canvas
			has percentage width and height set in CSS.
		*/
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
		
		this.graphics = this.canvas.getContext('2d');
	
		/*
			Use options from parameters if available, otherwise
			use interesting defaults
		*/
		this.numBirds = options ? options.numBirds || 50 : 50;
		this.maxVel = options ? options.maxVel || 4 : 4;
		this.bgColor = options ? options.bgColor || "rgba(0, 0, 0, 1.0)" : "rgba(0, 0, 0, 1.0)";
		this.birdColor = options ? options.birdColor || false : false;
		this.neighborDist = options ? options.neighborDist || 50 : 50;
		this.avoidDist = options ? options.avoidDist || 10 : 10;
		this.avoidWeight = options ? options.avoidWeight || 0.05 : 0.05;
		this.positionWeight = options ? options.positionWeight || 0.005 : 0.005;
		this.headingWeight = options ? options.headingWeight || 0.01 : 0.01;
		/* TODO: More options :) */
		
		this.birds = [];
		
		for(var i = 0; i < this.numBirds; i += 1)
		{
			var x = Math.random() * this.canvas.width;
			var y = Math.random() * this.canvas.height;
			var vx = Math.random() * 2 * this.maxVel - this.maxVel;
			var vy = Math.random() * 2 * this.maxVel - this.maxVel;
			var red = Math.floor(Math.random() * 156) + 100;
			var green = Math.floor(Math.random() * 156) + 100;
			var blue = Math.floor(Math.random() * 156) + 100;
			var alpha = Math.random() * 0.5 + 0.5;
			var color = this.birdColor ? this.birdColor : "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
			this.birds.push(new Boids.Bird(this, x, y, vx, vy, color));
		}
	}	
};

/**
	The animation loop.
*/
Boids.World.prototype.animate = function()
{
	"use strict";
	
	var world = this;
	requestAnimationFrame(function(){ world.animate(); });
	this.render();
};

/**
	This method clears the canvas, then asks each bird to
	animate itself.
*/
Boids.World.prototype.render = function()
{
	"use strict";
	
	var gr = this.graphics;
	
	gr.save();
	gr.fillStyle = this.bgColor;
	gr.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	for (var i = 0; i < this.birds.length; i += 1)
	{
		var b = this.birds[i];
		b.update();
		b.render(gr);
	}
	
	gr.restore();
};

/**
	requestAnimationFrame polyfill by Erik Moller, Opera engineer.
	Found this on Paul Irish's blog page, and it was easier than
	trying to write my own. :)
*/
(function()
{
	"use strict";
	
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());