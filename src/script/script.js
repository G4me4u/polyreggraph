var canvas;
var ctx;

var grapher;

var points;

function init() {
	canvas = document.getElementById("display");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx = canvas.getContext("2d");

	grapher = new Grapher();

	points = [];
	let num = 4;
	for (let i = -1; i <= num; i++)
		points.push(new Point(i / (num - 1) * 2.0 - 1.0, Math.random() * 2 - 1));
	setInterval(move, 16);
}

function move() {
	for (let i = points.length - 1; i >= 0; i--) 
		points[i].x -= 0.01;
	if (points[0].x < -1.0) {
		points.splice(0, 1);
		let x = points[points.length - 1].x + 1 / (points.length - 1) * 2.0;
		points.push(new Point(x, Math.random() * 2 - 1));
	}
	
	drawGraph(new Polynomial(points));
}

function drawGraph(graph) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	grapher.drawGraph(graph);
	grapher.drawPoints(points);
}

requestAnimationFrame(init);