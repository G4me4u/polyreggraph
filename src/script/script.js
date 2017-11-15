let m0 = new Mat(3, 3).toIdentity();
let m1 = new Mat(3, 3).toIdentity();

let r = m0.mulMat(m1);
console.log(r.toString());