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

	mulMat(other) {
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

	getElement(c, r) {
		return this.elements[c + r * this.width];
	}

	setElement(c, r, elem) {
		this.elements[c + r * this.width] = elem;
	}

	toString() {
		let res = "";
		let i = 0;
		for (let r = 0; r < this.height; r++) {
			if (r != 0)
				res += ", \n";
			for (let c = 0; c < this.width; c++) {
				if (c != 0)
					res += ", ";
				res += this.elements[i++].toFixed(4);
			}
		}
		return res;
	}
}