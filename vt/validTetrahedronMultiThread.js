const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const { KDTree } = require('kd-tree-javascript');

function readPointsFromFile(filename) {
    const points = [];
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

function splitArray(arr, chunks) {
    const result = [];
    for (let i = 0; i < chunks; i++) {
        result.push([]);
    }
    for (let i = 0; i < arr.length; i++) {
        result[i % chunks].push(arr[i]);
    }
    return result;
}

function findSmallestValidTetrahedron(points) {
    const numThreads = require('os').cpus().length;
    const chunks = splitArray(points, numThreads);
    
    let minVolume = Infinity;
    let bestTetrahedron = null;
    let pending = numThreads;

    return new Promise((resolve) => {
        chunks.forEach(chunk => {
            const worker = new Worker('./worker.js', { workerData: chunk });

            worker.on('message', (result) => {
                if (result && result.volume < minVolume) {
                    minVolume = result.volume;
                    bestTetrahedron = result.tetrahedron;
                }
                pending--;
                if (pending === 0) {
                    resolve(bestTetrahedron);
                }
            });

            worker.on('error', (error) => {
                console.error(error);
                pending--;
                if (pending === 0) {
                    resolve(bestTetrahedron);
                }
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code ${code}`);
                }
                pending--;
                if (pending === 0) {
                    resolve(bestTetrahedron);
                }
            });
        });
    });
}

// Assuming points are in a file named 'points.txt'
const points = readPointsFromFile('points.txt');
findSmallestValidTetrahedron(points).then(result => {
    if (result) {
        console.log(result.sort((a, b) => a - b));
    } else {
        console.log("No valid tetrahedron found.");
    }
});
