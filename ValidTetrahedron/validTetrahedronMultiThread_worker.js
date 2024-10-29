const { parentPort, workerData } = require('worker_threads');
const { KDTree } = require('kd-tree-javascript');

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
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

function findSmallestValidTetrahedron(points) {
    // Filter points by n value
    points = points.filter(p => p.n >= 5 && p.n <= 35);  // Adjust range as needed
    
    const kdTree = new KDTree(points, distance, ['x', 'y', 'z']);
    
    let minVolume = Infinity;
    let bestTetrahedron = null;

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const neighbors = kdTree.nearest(p1, 20);  // Increase the number of nearest neighbors

        for (let j = 0; j < neighbors.length; j++) {
            for (let k = j + 1; k < neighbors.length; k++) {
                for (let l = k + 1; k < neighbors.length; l++) {
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

    return { volume: minVolume, tetrahedron: bestTetrahedron };
}

const result = findSmallestValidTetrahedron(workerData);
parentPort.postMessage(result);
