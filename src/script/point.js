class Point {

	constructor(x = 0.0, y = 0.0) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	translate(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	distSqr(other) {
		return (other.x - this.x) *
		       (other.x - this.x) +
		       (other.y - this.y) *
		       (other.y - this.y);
	}

	dist(other) {
		return Math.sqrt(distSqr(other));
	}
}