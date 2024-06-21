"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
function readPoints(file) {
    return new Promise(function (resolve, reject) {
        var points = [];
        var rl = readline.createInterface({
            input: fs.createReadStream(file),
            output: process.stdout,
            terminal: false
        });
        rl.on('line', function (line) {
            var _a = line.replace(/[()]/g, '').split(', ').map(Number), x = _a[0], y = _a[1], z = _a[2], n = _a[3];
            points.push({ x: x, y: y, z: z, n: n });
        });
        rl.on('close', function () {
            resolve(points);
        });
        rl.on('error', reject);
    });
}
function volume(a, b, c, d) {
    var x0 = a.x, y0 = a.y, z0 = a.z;
    var x1 = b.x, y1 = b.y, z1 = b.z;
    var x2 = c.x, y2 = c.y, z2 = c.z;
    var x3 = d.x, y3 = d.y, z3 = d.z;
    return Math.abs((1.0 / 6.0) * ((x1 - x0) * ((y2 - y0) * (z3 - z0) - (z2 - z0) * (y3 - y0)) -
        (x2 - x0) * ((y1 - y0) * (z3 - z0) - (z1 - z0) * (y3 - y0)) +
        (x3 - x0) * ((y1 - y0) * (z2 - z0) - (z1 - z0) * (y2 - y0))));
}
function smallestTetrahedron(points) {
    var N = 100;
    var dp = Array(N + 1).fill(0);
    var minVolume = Infinity;
    var tetrahedrons = Array(N + 1).fill(null);
    var result = [-1, -1, -1, -1];
    for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++) {
            for (var k = j + 1; k < points.length; k++) {
                for (var l = k + 1; l < points.length; l++) {
                    var tetrahedron = [points[i], points[j], points[k], points[l]];
                    var nSum = tetrahedron.reduce(function (sum, point) { return sum + point.n; }, 0);
                    if (nSum == N) {
                        var vol = volume(tetrahedron[0], tetrahedron[1], tetrahedron[2], tetrahedron[3]);
                        if (minVolume > vol) {
                            minVolume = vol;
                            result = [i, j, k, l];
                        }
                    }
                }
            }
        }
    }
    console.log('minVolume:', minVolume);
    return result;
}
readPoints('points_small.txt')
    .then(smallestTetrahedron)
    .then(function (tetrahedron) { return console.log(tetrahedron); })
    .catch(console.error);
