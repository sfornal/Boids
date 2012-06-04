/** Boids is the name space function. Give a hoot, don't pollute! */
var Boids = Boids || {};

/**
	A Bird "class". Represents a point in space that moves according
	to a velocity vector. The velocity is changed according to an acceleration
	vector, calculated using the rules of the classic "boids" algorithm.
	@param x The x position of this Bird
	@param y The y position of this Bird
	@param vx The x component of this Bird's velocity
	@param vy The y component of this Bird's velocity
	@param color The color to draw this bird in, a string value
*/
Boids.Bird = function(world, x, y, vx, vy, color)
{
	"use strict";
	this.world = world;
	this.pos = new Boids.Vector2(x || 0, y || 0);
	this.vel = new Boids.Vector2(vx || 0, vy || 0);
	this.style = color || "#000000";
};

/**
	Gets the nearby neighbors of this Bird.
	@return An array of nearby neighbors.
*/
Boids.Bird.prototype.getFlock = function()
{
	"use strict";
	
	var myFlock = [];
	
	for(var i = 0; i < this.world.birds.length; i += 1)
	{
		var b = this.world.birds[i];
		
		if (this.pos.dist(b.pos) < this.world.neighborDist)
		{
			myFlock.push(b);
		}
	}
	
	return myFlock;
};

/**
	Draw this Bird onto the screen
	@param gr The graphics context to render itself onto
*/
Boids.Bird.prototype.render = function(gr)
{
	"use strict";
	
	gr.save();
	gr.fillStyle = this.style;
	gr.translate(this.pos.x, this.pos.y);
	gr.rotate(this.vel.heading());
	
	gr.beginPath();
	gr.moveTo(-5, 0);
	gr.lineTo(5, 0);
	gr.lineTo(3, 2);
	gr.moveTo(5, 0);
	gr.lineTo(3, -2);
	gr.stroke();
	gr.restore();
	
};

/**
	Update this Birds location using velocity and acceleration.
	Acceleration is calculated using the boids algorithm.
*/
Boids.Bird.prototype.update = function()
{
	this.pos.add(this.vel);
	this.pos.x = (this.pos.x + this.world.canvas.width) % this.world.canvas.width;
	this.pos.y = (this.pos.y + this.world.canvas.height) % this.world.canvas.height;
};