/**
 * A matrix with an arbitrary width
 * and height. The elements are stored
 * in the property 'elements' and will
 * be retreivable by using the following:
 * 
 * let cell = matrix.getElement(c, r)
 * 
 * or directly using the array:
 * 
 * let cell = matrix.elements[c + r * matrix.width]
 * 
 * where c is the column and r is the row
 * at which the cell is located. The array
 * is storted with a column major layout.
 * 
 * Likewise setting the value of an element
 * is doable by either calling setElement or
 * accessing the array directly.
 */
class Mat {

	constructor(width, height) {
		if (width == 0 || height == 0)
			throw "Invalid matrix! Width and height must be positive";

		this.width = width;
		this.height = height;
		
		this.size = width * height;
		this.elements = [];

		// Make sure the elements of the
		// matrix are initialized.
		while (this.elements.push(0.0) < this.size);
	}

	toIdentity() {
		if (this.width != this.height)
			throw "No identity exists; width != height";

		let i = 0;
		for (let r = 0; r < this.height; r++)
			for (let c = 0; c < this.width; c++)
				this.elements[i++] = r == c ? 1.0 : 0.0;
	
		return this;
	}

	mul(other) {
		if (other.constructor.name != Mat.name)
			throw "Object 'other' is not a matrix!";
		if (this.width != other.height)
			throw "Dimension mismatch; this.width != other.height"

		let result = new Mat(other.width, other.height);

		let i = 0;
		for (let r = 0; r < result.width; r++) {
			for (let c = 0; c < result.height; c++) {
				let sum = 0.0;
				for (let j = 0; j < this.width; j++)
					sum += this.getElement(j, r) * other.getElement(c, j);
				result.elements[i++] = sum;
			}	
		}

		return result;
	}

	solve(right) {
		if (this.width != this.height)
			throw "Matrix not solvable; width != height";
		if (right.height != this.height)
			throw "Dimension mismatch; right.height != this.height";
	
		const left = this.copy();
		
		for (let d = 0; d < left.height; d++) {
			let v = left.getElement(d, d);

			if (v < EPSILON && v > -EPSILON) {
				let r = d + 1;
				for ( ; r < left.height; r++) {
					let cc = left.getElement(d, r);
					if (cc > EPSILON || cc < -EPSILON) {
						for (let c = 0; c < left.width; c++)
							left.elements[c + d * left.width] += left.elements[c + r * left.width] / cc;
						for (let c = 0; c < right.width; c++)
							right.elements[c + d * right.width] += right.elements[c + r * left.width] / cc;
						break;
					}
				}

				if (r >= left.height)
					throw "Matrix not invertable";
			} else if (v != 1.0) {
				left.setElement(d, d, 1.0);
				for (let c = d + 1; c < left.width; c++)
					left.elements[c + d * left.width] /= v;
				for (let c = 0; c < right.width; c++)
					right.elements[c + d * right.width] /= v;
			}

			for (let r = 0; r < left.height; r++) {
				if (r == d)
					continue;
				
				let cc = left.getElement(d, r);
				if (cc != 0.0) {
					left.setElement(d, r, 0.0);
					for (let c = d + 1; c < left.width; c++)
						left.elements[c + r * left.width] -= left.elements[c + d * left.width] * cc;
					for (let c = 0; c < right.width; c++)
						right.elements[c + r * right.width] -= right.elements[c + d * right.width] * cc;
				}
			}
		}

		return right;
	}

	getElement(c, r) {
		return this.elements[c + r * this.width];
	}

	setElement(c, r, elem) {
		this.elements[c + r * this.width] = elem;
	}

	copy() {
		const result = new Mat(this.width, this.height);
		for (let i = 0; i < this.size; i++)
			result.elements[i] = this.elements[i];
		return result;
	}

	toString() {
		let result = "";
		let i = 0;
		for (let r = 0; r < this.height; r++) {
			if (r != 0)
				result += ", \n";
			for (let c = 0; c < this.width; c++) {
				if (c != 0)
					result += ", ";
				result += this.elements[i++].toFixed(4);
			}
		}
		return result;
	}
}