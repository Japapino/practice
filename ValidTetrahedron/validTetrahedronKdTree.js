"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var KDTree = require("kd-tree-ts");
function readPointsFromFile(filename) {
    var points = [];
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split('\n');
    var index = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.trim()) {
            var _a = line.trim().split(',').map(Number), x = _a[0], y = _a[1], z = _a[2], n = _a[3];
            points.push({ x: x, y: y, z: z, n: Math.floor(n), index: index });
            index++;
        }
    }
    return points;
}
function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}
function calculateVolume(A, B, C, D) {
    var matrix = [
        [1, A.x, A.y, A.z],
        [1, B.x, B.y, B.z],
        [1, C.x, C.y, C.z],
        [1, D.x, D.y, D.z],
    ];
    var determinant = function (matrix) {
        return (matrix[0][0] * matrix[1][1] * matrix[2][2] * matrix[3][3] +
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
            matrix[0][3] * matrix[1][2] * matrix[2][0] * matrix[3][1]);
    };
    return Math.abs(determinant(matrix)) / 6;
}
function findSmallestValidTetrahedron(points) {
    var kdTree = new KDTree(points, distance, ['x', 'y', 'z']);
    var minVolume = Infinity;
    var bestTetrahedron = null;
    for (var i = 0; i < points.length; i++) {
        var p1 = points[i];
        var neighbors = kdTree.nearest(p1, 10); // Adjust the number of nearest neighbors as needed
        for (var j = 0; j < neighbors.length; j++) {
            for (var k = j + 1; k < neighbors.length; k++) {
                for (var l = k + 1; l < neighbors.length; l++) {
                    var p2 = neighbors[j][0];
                    var p3 = neighbors[k][0];
                    var p4 = neighbors[l][0];
                    if (p1.index !== p2.index && p1.index !== p3.index && p1.index !== p4.index &&
                        p2.index !== p3.index && p2.index !== p4.index && p3.index !== p4.index) {
                        var nSum = p1.n + p2.n + p3.n + p4.n;
                        if (nSum === 100) {
                            var volume = calculateVolume(p1, p2, p3, p4);
                            if (volume < minVolume) {
                                minVolume = volume;
                                bestTetrahedron = [p1.index, p2.index, p3.index, p4.index];
                            }
                        }
                    }
                }
            }
        }
    }
    return bestTetrahedron ? bestTetrahedron.sort(function (a, b) { return a - b; }) : null;
}
// Assuming points are in a file named 'points.txt'
var points = readPointsFromFile('points_small.txt');
var result = findSmallestValidTetrahedron(points);
if (result) {
    console.log(result);
}
else {
    console.log("No valid tetrahedron found.");
}
