const fs = require("fs");

function validTetrahedron(filePath: string): number[] {
  // the goal of this exercise is to return the samllest possible tetrahedron from a series of points that are recieved by a file. The points are in the format (x,y,z,n) where the sum of the n values
  // from each point must be equal to 100.
  // tetrahedron has 4 points
  // find smallest tetrahedron from the list of points
  // the points' n values must sum to 100
  console.time('findSmallestValidTetrahedron');

  const data = fs.readFileSync(filePath).toString();
  const lines = data.split("\n");
  const points = lines.map((line) => {
    const components = line.replace(/[()]/g, "").split(",");
    return components.map((component) => parseFloat(component));
  });

  let smallestVolume: number = Number.MAX_VALUE;
  let smallestTetrahedron: number[] = [];
  // Generate all combinations of 4 points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        for (let l = k + 1; l < points.length; l++) {
          const tetrahedron = [points[i], points[j], points[k], points[l]];

          // Check if the sum of the n values is 100
          const sumN = tetrahedron.reduce((sum, point) => sum + point[3], 0);
          if (sumN === 100) {
            // Calculate the volume of the tetrahedron
            const volume: number = calculateTetrahedronVolume(
              tetrahedron[0],
              tetrahedron[1],
              tetrahedron[2],
              tetrahedron[3]
            );

            // Update the smallest volume and corresponding tetrahedron
            if (volume < smallestVolume) {
              // console.log("volume: ", volume);
              // console.log("tetrahedron: ", tetrahedron);
              smallestVolume = volume;
              smallestTetrahedron = [points.indexOf(tetrahedron[0]), points.indexOf(tetrahedron[1]), points.indexOf(tetrahedron[2]), points.indexOf(tetrahedron[3])];
            }
          }
        }
      }
    }
  }

  console.timeEnd("findSmallestValidTetrahedron");

  return smallestTetrahedron;
}

function calculateTetrahedronVolume(
  point1: number[],
  point2: number[],
  point3: number[],
  point4: number[]
): number {
  let volume = 0;

  // magnatude of a vectors
  let AB = [
    point2[0] - point1[0],
    point2[1] - point1[1],
    point2[2] - point1[2],
  ];
  let AC = [
    point3[0] - point1[0],
    point3[1] - point1[1],
    point3[2] - point1[2],
  ];
  let AD = [
    point4[0] - point1[0],
    point4[1] - point1[1],
    point4[2] - point1[2],
  ];

  // cross products
  let xProdX = AB[1] * AC[2] - AB[2] * AC[1];
  let xProdY = AB[2] * AC[0] - AB[0] * AC[2];
  let xProdZ = AB[0] * AC[1] - AB[1] * AC[0];

  // dot product of AD with cross product of AB and AC
  let scalarTripleProduct = AD[0] * xProdX + AD[1] * xProdY + AD[2] * xProdZ;

  volume = Math.abs(scalarTripleProduct) / 6;

  return volume;
}

const result = validTetrahedron("points_large.txt");
console.log("==== Result ====");
console.log(result);
