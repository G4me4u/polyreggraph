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
	let num = 6;
	for (let i = 0; i < num; i++)
		points.push(new Point(Math.random() * 2 - 1, Math.random() * 2 - 1));
	drawGraph(new Polynomial(points));
}

function drawGraph(graph) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	grapher.drawGraph(graph);
	grapher.drawPoints(points);
}

requestAnimationFrame(init);