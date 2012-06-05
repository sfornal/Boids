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
		
		if (b !== this && this.pos.distance(b.pos) < this.world.neighborDist)
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
	gr.strokeStyle = this.style;
	gr.translate(this.pos.x, this.pos.y);
	gr.rotate(this.vel.heading());
	
	gr.beginPath();
	gr.moveTo(-5, 0.5);
	gr.lineTo(5, 0.5);
	gr.lineTo(3, 2);
	gr.moveTo(5, 0.5);
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
	"use strict";
	
	/* Get neighbors */
	var flock = this.getFlock();	
	/* First rule - steer towards center mass */
	var position = new Boids.Vector2();
	/* Second rule - steer towards common heading */
	var heading = new Boids.Vector2();
	/* Third rule - steer away from collisions */
	var collide = new Boids.Vector2();
	/* Fourth rule - stay in bounds */
	var bounds = new Boids.Vector2();
	
	for (var i = 0; i < flock.length; i += 1)
	{
		var b = flock[i];
		/* Add position and vel of other bird to total */
		position.add(b.pos);
		heading.add(b.vel);
		
		/* Check to see if we're too close to other bird */
		var toward = b.pos.subNew(this.pos);
		if (toward.mag() < this.world.avoidDist)
		{
			toward.scale(this.world.avoidWeight);
			collide.sub(toward);
		}
	}
	
	/* Calculate average vector for neighbors, and scale by predefined weights */
	if (flock.length > 0)
	{
		position.scale(1 / flock.length).sub(this.pos).scale(this.world.positionWeight);
		heading.scale(1 / flock.length).sub(this.vel).scale(this.world.headingWeight);
	}
	
	/* Check if the bird went off screen, and steer back on if needed */
	if (this.pos.x < 0)
	{
		bounds.x = 0.25;
	}
	else if (this.pos.x > this.world.canvas.width)
	{
		bounds.x = -0.25;
	}
	
	if (this.pos.y < 0)
	{
		bounds.y = 0.25;
	}
	else if (this.pos.y > this.world.canvas.height)
	{
		bounds.y = -0.25;
	}
	
	/* Now, add these vectors to vel, then limit to max vel */
	this.vel.add(position).add(heading).add(collide).add(bounds).limit(this.world.maxVel);	
	
	/* Finally, update position according to velocity */
	this.pos.add(this.vel);
};