window.addEventListener('load', function()
{
	"use strict";
	
	/* Default demo */
	var demo1 = new Boids.World('boids1');
	demo1.animate();
	
	/* Demo with customized options */
	var demo2 = new Boids.World('boids2', 
	{
		bgColor: "rgba(255, 255, 255, 0.2)",
		numBirds: 200,
		birdColor: "#000000",
		maxVel: 10,
		neighborDist: 25,
		avoidDist: 20,
		headingWeight: 0.00001,
		positionWeight: 0.00001
	});
	demo2.animate();
	
}, true);