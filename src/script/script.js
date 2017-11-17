var canvas;
var ctx;

var points;

function init() {
	canvas = document.getElementById("display");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx = canvas.getContext("2d");

	points = [];
	let num = 6;
	for (let i = 0; i < num; i++)
		points.push(new Point(Math.random() * 2 - 1, Math.random() * 2 - 1));
	drawGraph(new Polynomial(points));
}

function drawGraph(graph) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (graph) {
		ctx.beginPath();
		let first = true;
		for (let x = -1.0; x < 1.0; x += 0.01) {
			if (first) {
				first = false;
				ctx.moveTo((x + 1) * canvas.width / 2, (1 - graph.getY(x)) * canvas.height / 2);
			} else {
				ctx.lineTo((x + 1) * canvas.width / 2, (1 - graph.getY(x)) * canvas.height / 2);
			}
		}
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
		
	ctx.fillStyle = "red";
	for (let point of points)
		ctx.fillRect((point.x + 1) * canvas.width / 2 - 5, (1 - point.y) * canvas.height / 2 - 5, 10, 10);
}

requestAnimationFrame(init);