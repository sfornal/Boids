/** Boids is the name space function. Give a hoot, don't pollute! */
var Boids = Boids || {};

/**
	A simplistic 2-D Vector implementation, written
	for the practice.
	@param dx The x component of the vector, defaults to 0
	@param dy The y component of the vector, defaults to 0
*/
Boids.Vector2 = function(dx, dy)
{
	"use strict";
	this.x = dx || 0;
	this.y = dy || 0;
};

/**
	Return a string in the form "x: n y: n"
	@return The string representation of this vector
*/
Boids.Vector2.prototype.toString = function()
{
	"use strict";
	return "x: " + this.x + " y: " + this.y;
};

/**
	Returns a copy of this vector.
	@return A copy of this vector
*/
Boids.Vector2.prototype.copy = function()
{
	"use strict";
	return new Boids.Vector2(this.x, this.y);
};

/**
	Adds another vector to this vector.
	This method mutates the current vector.
	@param v The vector to add
	@return This vector for chaining
*/
Boids.Vector2.prototype.add = function(v)
{
	"use strict";
	this.x += v.x;
	this.y += v.y;
	return this;
};

/**
	Adds a vector to this vector, and returns the result
	as a new vector. addNew() does not mutate this vector.
	@param v The vector to add
	@return The result as a new vector
*/
Boids.Vector2.prototype.addNew = function(v)
{
	"use strict";
	return this.copy().add(v);
};

/**
	Subtracts another vector from this vector.
	This method mutates the current vector.
	@param v The vector to subtract
	@return This vector for chaining
*/
Boids.Vector2.prototype.sub = function(v)
{
	"use strict";
	this.x -= v.x;
	this.y -= v.y;
	return this;
};

/**
	Subtracts a vector from this vector, and returns the result
	as a new vector. subNew() does not mutate this vector.
	@param v The vector to subtract
	@return The result as a new vector
*/

Boids.Vector2.prototype.subNew = function(v)
{
	"use strict";
	return this.copy().sub(v);
};

/**
	Scales this vector by a scalar value. scale() mutates this vector.
	@param sc The scalar value
	@return This vector, for chaining
*/
Boids.Vector2.prototype.scale = function(sc)
{
	"use strict";
	this.x *= sc;
	this.y *= sc;
	return this;
};

/**
	Calculates the scalar product of two vectors.
	@param v The vector to "dot" with this vector
	@return The scalar product
*/
Boids.Vector2.prototype.dot = function(v)
{
	"use strict";
	return this.x * v.x + this.y * v.y;
};

/**
	Returns the magnitude of this vector
	@return The magnitude of this vector
*/
Boids.Vector2.prototype.mag = function()
{
	"use strict";
	return Math.sqrt(this.dot(this));
};

/**
	Normalize this vector, changing it to a unit vector.
	@return This vector, for chaining
*/
Boids.Vector2.prototype.norm = function()
{
	"use strict";
	return this.scale(1 / this.mag());
};

/**
	Get a normalized copy of this vector.
	@return A normalized copy of this vector
*/
Boids.Vector2.prototype.normNew = function()
{
	"use strict";
	return this.copy().norm();
};

/**
	Get the heading (in radians) of this vector.
	@return The heading of this vector
*/
Boids.Vector2.prototype.heading = function()
{
	"use strict";
	return Math.atan2(this.y, this.x);
};