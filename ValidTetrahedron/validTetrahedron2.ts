import * as fs from 'fs';
import * as readline from 'readline';

interface Point {
    x: number;
    y: number;
    z: number;
    n: number;
}

function readPoints(file: string): Promise<Point[]> {
    return new Promise((resolve, reject) => {
        const points: Point[] = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(file),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', (line) => {
            const [x, y, z, n] = line.replace(/[()]/g, '').split(', ').map(Number);
            points.push({ x, y, z, n });
        });

        rl.on('close', () => {
            resolve(points);
        });

        rl.on('error', reject);
    });
}

function volume(a: Point, b: Point, c: Point, d: Point): number {
    const x0 = a.x, y0 = a.y, z0 = a.z;
    const x1 = b.x, y1 = b.y, z1 = b.z;
    const x2 = c.x, y2 = c.y, z2 = c.z;
    const x3 = d.x, y3 = d.y, z3 = d.z;
    return Math.abs((1.0/6.0) * (
        (x1-x0)*((y2-y0)*(z3-z0)-(z2-z0)*(y3-y0)) -
        (x2-x0)*((y1-y0)*(z3-z0)-(z1-z0)*(y3-y0)) +
        (x3-x0)*((y1-y0)*(z2-z0)-(z1-z0)*(y2-y0))
    ));
}

function smallestTetrahedron(points: Point[]): number[] {
    const N = 100;
    const dp: number[] = Array(N + 1).fill(0);
    let minVolume = Infinity;
    const tetrahedrons: Point[][] = Array(N + 1).fill(null);
    let result: number[] = [-1, -1, -1, -1];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            for (let k = j + 1; k < points.length; k++) {
                for (let l = k + 1; l < points.length; l++) {
                    const tetrahedron = [points[i], points[j], points[k], points[l]];
                    const nSum = tetrahedron.reduce((sum, point) => sum + point.n, 0);
                    if (nSum == N) {
                        const vol = volume(tetrahedron[0], tetrahedron[1], tetrahedron[2], tetrahedron[3]);
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
    .then(tetrahedron => console.log(tetrahedron))
    .catch(console.error);