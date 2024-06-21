const fs = require("fs");
const { kdTree: KDTree } = require("kd-tree-javascript");
var readline = require("readline");

function readPointsFromFile(file) {
  return new Promise(function (resolve, reject) {
    var points = [];
    var rl = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });
    rl.on("line", function (line) {
      var _a = line.replace(/[()]/g, "").split(", ").map(Number),
        x = _a[0],
        y = _a[1],
        z = _a[2],
        n = _a[3];
      points.push({ x: x, y: y, z: z, n: n });
    });
    rl.on("close", function () {
      resolve(points);
    });
    rl.on("error", reject);
  });
}

function readFromFile(file) {
  var data = fs.readFileSync(file).toString();
  var lines = data.split("\n");
  var points = lines.map(function (line) {
      var components = line.replace(/[()]/g, "").split(",");
      return components.map(function (component) { return parseFloat(component); });
  });
  return points;
}

function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}

function calculateVolume(A, B, C, D) {
  const matrix = [
    [1, A.x, A.y, A.z],
    [1, B.x, B.y, B.z],
    [1, C.x, C.y, C.z],
    [1, D.x, D.y, D.z],
  ];

  const determinant = (matrix) => {
    return (
      matrix[0][0] * matrix[1][1] * matrix[2][2] * matrix[3][3] +
      matrix[0][0] * matrix[1][2] * matrix[2][3] * matrix[3][1] +
      matrix[0][0] * matrix[1][3] * matrix[2][1] * matrix[3][2] +
      matrix[0][1] * matrix[1][0] * matrix[2][3] * matrix[3][2] +
      matrix[0][1] * matrix[1][2] * matrix[2][0] * matrix[3][3] +
      matrix[0][1] * matrix[1][3] * matrix[2][2] * matrix[3][0] +
      matrix[0][2] * matrix[1][0] * matrix[2][1] * matrix[3][3] +
      matrix[0][2] * matrix[1][1] * matrix[2][3] * matrix[3][0] +
      matrix[0][2] * matrix[1][3] * matrix[2][0] * matrix[3][1] +
      matrix[0][3] * matrix[1][0] * matrix[2][2] * matrix[3][1] +
      matrix[0][3] * matrix[1][1] * matrix[2][0] * matrix[3][2] +
      matrix[0][3] * matrix[1][2] * matrix[2][1] * matrix[3][0] -
      matrix[0][0] * matrix[1][1] * matrix[2][3] * matrix[3][2] -
      matrix[0][0] * matrix[1][2] * matrix[2][1] * matrix[3][3] -
      matrix[0][0] * matrix[1][3] * matrix[2][2] * matrix[3][1] -
      matrix[0][1] * matrix[1][0] * matrix[2][2] * matrix[3][3] -
      matrix[0][1] * matrix[1][2] * matrix[2][3] * matrix[3][0] -
      matrix[0][1] * matrix[1][3] * matrix[2][0] * matrix[3][2] -
      matrix[0][2] * matrix[1][0] * matrix[2][3] * matrix[3][1] -
      matrix[0][2] * matrix[1][1] * matrix[2][0] * matrix[3][3] -
      matrix[0][2] * matrix[1][3] * matrix[2][1] * matrix[3][0] -
      matrix[0][3] * matrix[1][0] * matrix[2][1] * matrix[3][2] -
      matrix[0][3] * matrix[1][1] * matrix[2][2] * matrix[3][0] -
      matrix[0][3] * matrix[1][2] * matrix[2][0] * matrix[3][1]
    );
  };

  return Math.abs(determinant(matrix)) / 6;
}

function calcVolume(a, b, c, d) {
    var x0 = a.x, y0 = a.y, z0 = a.z;
    var x1 = b.x, y1 = b.y, z1 = b.z;
    var x2 = c.x, y2 = c.y, z2 = c.z;
    var x3 = d.x, y3 = d.y, z3 = d.z;
    return Math.abs((1.0 / 6.0) * ((x1 - x0) * ((y2 - y0) * (z3 - z0) - (z2 - z0) * (y3 - y0)) -
        (x2 - x0) * ((y1 - y0) * (z3 - z0) - (z1 - z0) * (y3 - y0)) +
        (x3 - x0) * ((y1 - y0) * (z2 - z0) - (z1 - z0) * (y2 - y0))));
}

function findSmallestValidTetrahedron(points) {
  console.log('points: ', points);
  const kdTree = new KDTree(points, distance, ["x", "y", "z"]);

  let minVolume = Infinity;
  let bestTetrahedron = null;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const neighbors = kdTree.nearest(p1, 10); // Adjust the number of nearest neighbors as needed
    // console.log('neighbors: ', neighbors);
    // console.log('i: ', i );
    for (let j = 0; j < neighbors.length; j++) {
      for (let k = j + 1; k < neighbors.length; k++) {
        for (let l = k + 1; l < neighbors.length; l++) {
          const p2 = neighbors[j][0];
          const p3 = neighbors[k][0];
          const p4 = neighbors[l][0];


          if (points.indexOf(p1) !== points.indexOf(p2) && points.indexOf(p1) !== points.indexOf(p3) && points.indexOf(p1) !== points.indexOf(p4) &&
              points.indexOf(p2) !== points.indexOf(p3) && points.indexOf(p2) !== points.indexOf(p4) && points.indexOf(p3) !== points.indexOf(p4)) {
          // if (i !== j && i !== k && i !== l && j !== k && j !== l && k !== l) {
            // console.log("p1: ", p1, "p2: ", p2, "p3: ", p3, "p4: ", p4);
            // console.log('i: ', i, 'j: ', j, 'k: ', k, 'l: ', l);

            const nSum = p1.n + p2.n + p3.n + p4.n;

            if (nSum === 100) {
              // console.log('nSum: ', nSum);
              const volume = calcVolume(p1, p2, p3, p4);
              // console.log("volume: ", volume);

              if (volume < minVolume) {
                console.log('=============================================');
                // console.log('neighbors: ', neighbors);
                // console.log('neighbors[j]: ', neighbors[j]);
                console.log('points: ', points);
                console.log('i: ', i); 
                console.log('points[i]: ', points[i]);
                console.log('=============================================');
                // console.log("1: ", p1, "\n2: ", p2, "\n3: ", p3, "\n4: ", p4);
                // console.log("i: ", i, "j: ", j, "k: ", k, "l: ", l);
                // console.log("p1: ", points.indexOf(p1), "p2: ", points.indexOf(p2), "p3: ", points.indexOf(p3), "p4: ", points.indexOf(p4));
                minVolume = volume;
                bestTetrahedron = [points.indexOf(p1), points.indexOf(p2), points.indexOf(p3), points.indexOf(p4)];
              }
            }
          }
        }
      }
    }
  }

  console.log("minVolume: ", minVolume);
  console.log("bestTetrahedron: ", bestTetrahedron);

  return bestTetrahedron;
}

readPointsFromFile("points_small.txt")
  .then(findSmallestValidTetrahedron)
  .then(function (tetrahedron) {
    return console.log(tetrahedron);
  })
  .catch(console.error);

// let result = findSmallestValidTetrahedron(readFromFile("points_small.txt"));
// console.log("==== Result ====");
// console.log(result);