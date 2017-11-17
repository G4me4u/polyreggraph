class Polynomial {

	constructor(points) {
		const m = new Mat(points.length);
		const s = new Mat(1, points.length);
		for (let i = 0; i < points.length; i++) {
			const point = points[i];

			let v = 1.0;
			for (let j = points.length - 1; j >= 0; j--) {
				m.setElement(j, i, v);
				v *= point.x;
			}
			s.setElement(0, i, point.y);
		}

		this.coefficients = m.solve(s).elements;
	}

	getY(x) {
		let r = 0.0;
		let v = 1.0;
		for (let i = this.coefficients.length - 1; i >= 0; i--) {
			r += v * this.coefficients[i];
			v *= x;
		}
		return r;
	}

	toString() {
		let result = "";
		for (let i = 0; i < this.coefficients.length; i++) {
			if (i != this.coefficients.length - 1) {
				result += this.coefficients[i] + "x^" + (this.coefficients.length - i - 1) + " + ";
			} else {
				result += this.coefficients[i];
			}
		}
		return result;
	}
}