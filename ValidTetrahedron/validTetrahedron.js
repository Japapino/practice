var fs = require("fs");
function validTetrahedron(filePath) {
    // the goal of this exercise is to return the samllest possible tetrahedron from a series of points that are recieved by a file. The points are in the format (x,y,z,n) where the sum of the n values
    // from each point must be equal to 100.
    // tetrahedron has 4 points
    // find smallest tetrahedron from the list of points
    // the points' n values must sum to 100
    console.time('findSmallestValidTetrahedron');
    var data = fs.readFileSync(filePath).toString();
    var lines = data.split("\n");
    var points = lines.map(function (line) {
        var components = line.replace(/[()]/g, "").split(",");
        return components.map(function (component) { return parseFloat(component); });
    });
    var smallestVolume = Number.MAX_VALUE;
    var smallestTetrahedron = [];
    // Generate all combinations of 4 points
    for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++) {
            for (var k = j + 1; k < points.length; k++) {
                for (var l = k + 1; l < points.length; l++) {
                    var tetrahedron = [points[i], points[j], points[k], points[l]];
                    // Check if the sum of the n values is 100
                    var sumN = tetrahedron.reduce(function (sum, point) { return sum + point[3]; }, 0);
                    if (sumN === 100) {
                        // Calculate the volume of the tetrahedron
                        var volume = calculateTetrahedronVolume(tetrahedron[0], tetrahedron[1], tetrahedron[2], tetrahedron[3]);
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
function calculateTetrahedronVolume(point1, point2, point3, point4) {
    var volume = 0;
    // magnatude of a vectors
    var AB = [
        point2[0] - point1[0],
        point2[1] - point1[1],
        point2[2] - point1[2],
    ];
    var AC = [
        point3[0] - point1[0],
        point3[1] - point1[1],
        point3[2] - point1[2],
    ];
    var AD = [
        point4[0] - point1[0],
        point4[1] - point1[1],
        point4[2] - point1[2],
    ];
    // cross products
    var xProdX = AB[1] * AC[2] - AB[2] * AC[1];
    var xProdY = AB[2] * AC[0] - AB[0] * AC[2];
    var xProdZ = AB[0] * AC[1] - AB[1] * AC[0];
    // dot product of AD with cross product of AB and AC
    var scalarTripleProduct = AD[0] * xProdX + AD[1] * xProdY + AD[2] * xProdZ;
    volume = Math.abs(scalarTripleProduct) / 6;
    return volume;
}
var result = validTetrahedron("points_large.txt");
console.log("==== Result ====");
console.log(result);
