var Boids = function(elem)
{
	var canvas = document.getElementById(elem),
	    birds = [],
	    x = 0,
	    y = 0;
	    
	
	function _resize()
	{
		//console.log('Resizing');
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
	}
	
	function _update()
	{
		//console.log('Updating');
		
		x = ((x + 1) + canvas.width) % canvas.width;
		y = ((y + 1) + canvas.height) % canvas.height;
		
	}
	
	function _render()
	{
		//console.log('Rendering');
		if (canvas.getContext)
		{
			var ctx = canvas.getContext('2d');
			ctx.save();
			ctx.translate(x, y);
			ctx.fillStyle = 'rgb(' + Math.floor(((x + y) / 2) % 256) + ', ' + Math.floor(((x + y) / 2) % 256) + ', ' + Math.floor(((x + y) / 2) % 256) + ')';
			ctx.fillRect(-1, -1, 2, 2);
			ctx.restore();
		}
		else
		{
			console.log('Cannot render to canvas');
		}
	}
	
	return {
		resize: _resize,
		update: _update,
		render: _render
	}
	
}('boids');

document.body.addEventListener('load', function()
{
	Boids.resize();
	
	window.addEventListener('resize', function(){
		Boids.resize();
	}, false);
	
	setInterval(function()
	{
		Boids.update();
		Boids.render();
	}, 1);
	
}, true);

