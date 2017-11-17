class Grapher {

	constructor() {
		this.min = -1.0;
		this.max =  1.0;
		this.step = 2.0 / canvas.width;
	}

	drawGraph(graph) {
		this.moveCurser(this.min, graph.getY(this.min));
		for (let x = this.min + this.step; x < this.max; x += this.step)
			this.curserLineTo(x, graph.getY(x));
		this.stroke();
	}

	drawPoints(points, color="red") {
		ctx.fillStyle = color;
		for (let point of points)
			ctx.fillRect(this.plotX(point.x) - 5, this.plotY(point.y) - 5, 10, 10);
	}

	moveCurser(x, y) {
		ctx.moveTo(this.plotX(x), this.plotY(y));
	}

	curserLineTo(x, y) {
		ctx.lineTo(this.plotX(x), this.plotY(y));
	}

	stroke(color="black") {
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	plotX(x) {
		return (x + 1.0) * canvas.width / 2.0;
	}

	plotY(y) {
		return (1.0 - y) * canvas.height / 2.0;
	}
}