/** Boids is the name space function. Give a hoot, don't pollute! */
var Boids = {};

/**
	A simplistic 2-D Vector implementation, written
	for the practice.
	@param dx The x component of the vector, defaults to 0
	@param dy The y component of the vector, defaults to 0
*/
Boids.Vector2 = function(dx, dy)
{
	this.x = dx || 0;
	this.y = dy || 0;
};

/**
	Return a string in the form "x: n y: n"
	@return The string representation of this vector
*/
Boids.Vector2.prototype.toString = function()
{
	return "x: " + this.x + " y: " + this.y;
};

/**
	Returns a copy of this vector.
	@return A copy of this vector
*/
Boids.Vector2.prototype.copy = function()
{
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
	return this.copy().sub(v);
};

/**
	Scales this vector by a scalar value. scale() mutates this vector.
	@param sc The scalar value
	@return This vector, for chaining
*/
Boids.Vector2.prototype.scale = function(sc)
{
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
	return this.x * v.x + this.y * v.y;
};

/**
	Returns the magnitude of this vector
	@return The magnitude of this vector
*/
Boids.Vector2.prototype.mag = function()
{
	return Math.sqrt(this.dot(this));
};

/**
	Normalize this vector, changing it to a unit vector.
	@return This vector, for chaining
*/
Boids.Vector2.prototype.norm = function()
{
	return this.scale( 1 / this.mag() );
};



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
Boids.Bird = function(x, y, vx, vy, color)
{
	this.pos = new Boids.Vector2(x, y);
	this.vel = new Boids.Vector2(vx, vy);
	this.style = color;
};