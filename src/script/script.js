let m = new Mat(3, 3);
m.setElement(0, 0, 0.0);
m.setElement(1, 0, 1.0);
m.setElement(2, 0, 1.0);

m.setElement(0, 1, 1.0);
m.setElement(1, 1, 0.0);
m.setElement(2, 1, 1.0);

m.setElement(0, 2, 1.0);
m.setElement(1, 2, 1.0);
m.setElement(2, 2, 0.0);

console.log("Inverting...");

let inverse = m.solve(new Mat(3, 3).toIdentity());

console.log(inverse.toString());

console.log("Multiplying...");
console.log(inverse.mul(m).toString());