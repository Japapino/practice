import * as fs from 'fs';
import KDTree from 'kd-tree-ts';

interface Point {
    x: number;
    y: number;
    z: number;
    n: number;
    index: number;
}

function readPointsFromFile(filename: string): Point[] {
    const points: Point[] = [];
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');
    let index = 0;
    for (const line of lines) {
        if (line.trim()) {
            const [x, y, z, n] = line.trim().split(',').map(Number);
            points.push({ x, y, z, n: Math.floor(n), index });
            index++;
        }
    }
    return points;
}

function distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}

function calculateVolume(A: Point, B: Point, C: Point, D: Point): number {
    const matrix = [
        [1, A.x, A.y, A.z],
        [1, B.x, B.y, B.z],
        [1, C.x, C.y, C.z],
        [1, D.x, D.y, D.z],
    ];

    const determinant = (matrix: number[][]): number => {
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

function findSmallestValidTetrahedron(points: Point[]): number[] | null {
    const kdTree = new KDTree(points);
    
    let minVolume = Infinity;
    let bestTetrahedron: number[] | null = null;

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const neighbors = kdTree.nearest(p1, 10);  // Adjust the number of nearest neighbors as needed
        
        for (let j = 0; j < neighbors.length; j++) {
            for (let k = j + 1; k < neighbors.length; k++) {
                for (let l = k + 1; l < neighbors.length; l++) {
                    const p2 = neighbors[j][0];
                    const p3 = neighbors[k][0];
                    const p4 = neighbors[l][0];

                    if (p1.index !== p2.index && p1.index !== p3.index && p1.index !== p4.index && 
                        p2.index !== p3.index && p2.index !== p4.index && p3.index !== p4.index) {
                        
                        const nSum = p1.n + p2.n + p3.n + p4.n;

                        if (nSum === 100) {
                            const volume = calculateVolume(p1, p2, p3, p4);
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

    return bestTetrahedron ? bestTetrahedron.sort((a, b) => a - b) : null;
}

// Assuming points are in a file named 'points.txt'
const points = readPointsFromFile('points_small.txt');
const result = findSmallestValidTetrahedron(points);
if (result) {
    console.log(result);
} else {
    console.log("No valid tetrahedron found.");
}
