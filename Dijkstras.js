// sample input where each node has an map for each neighbor node distance
function dijkstra_end(graph, start, end) {
	let distances = {}; // keeps current values of nodes while calc's are running
	let previous = {}; // keeps track of current path
	let unvisited = new Set(); // keeps unvisited nodes

	// setting A to 0, and other nodes to infinity
	// storing them in unvisited. Unvisited: { A, B, C, D, E }
	for ( let node in graph ) {
		distances[node] = node === start ? 0 : Infinity;
		unvisited.add(node); 
	}

    // continue looping until unvisited node set is empty
    while (unvisited.size) {
        let closestNode = null; 

        // iterates through unvisited set, to find closest node 
        for (let node of unvisited) {
            if (!closestNode || distances[node] < distances[closestNode]) {
                closestNode = node; 
            }
        }

        if (distances[closestNode] === Infinity) break; // if the closest node is infinity then we can't reach the other nodes
        if (closestNode === end) break; // if we are at the end then the algorithm is done. 

        // loop through all neighbors of closest node 
        for (let neighbor in graph[closestNode]) {
            let newDistnace = distances[closestNode] + graph[closestNode][neighbor]; // calc distances from source taking current (node value) + (neighbor edge value)
            if (newDistnace < distances[neighbor]) {
                distances[neighbor] = newDistnace;
                previous[neighbor] = closestNode;
            }
        }
        unvisited.delete(closestNode); // remove closest node from unvisited set;

    }

	let path = []; // set variable for current path.
    let node = end; // start at end node. 

    while (node) {
        path.push(node); 
        node = previous[node];
    }

    return path.reverse(); 
}

// sample input where each node has an map for each neighbor node distance
// const graph = {
//     A: { B: 1, C: 4 },
//     B: { A: 1, C: 2, D: 5 },
//     C: { A: 4, B: 2, D: 1 },
//     D: { B: 5, C: 1, E: 3 },
//     E: { D: 3 }
//   };

// console.log(dijkstra_alt(graph)); 

// From Neet Code
// Another version of the problem where the function takes in different props and it will tell you the
// shortest distance for EVERY other vertext in the graph

// props
// n: # of vertacies in graph
// edges: list of tuples representing a directed edge in the from of (u, v, w)
            // u: source vertex
            // v: destination vertex
            // w: is the weight
// source: which vertext to start at

const edges = [
    [0, 1, 10], 
    [0, 2, 3], 
    [1, 3, 2], 
    [2, 1, 4], 
    [2, 3, 8], 
    [2, 4, 2], 
    [3, 4, 5], 

 ]

//      10     1
//  (0)---(1)---(2)
//   |   / | \   |
//   3  /  2   4 8
//   | 8   |  5  |
//   |/---(3)---(4)
//  (2)---------/
//         2  

const dijkstra_neetCode = (n, edges, src) => {
    let adj = {}; // build adjacency list with infinity (or empty in this case) values

    // transform edges into adjacency list
    edges.forEach((v) => {
        // get the src, destination, and weight of each edge
        const s = v[0]; 
        const d = v[1];
        const weight = v[2];

        // add them to the adj map
        adj[s] = [d, weight];
    });

    let shortestPath = new Map();  
    let min = {}; // could implement a heap, but in JS we would have to build it so we will use Math.min(min.values());
    // the map isnt working for us since each key needs to be unique, change keys to [src, dest] => value
    min[src] = 0; 

    console.log('adj: ', adj); 
    // is it worth it to implement heaps in JS when problem solving? 
    let n1 = -1;
    // keep looping while min is non-empty
        while (min) {
        console.log('min1: ', min); 

        let w1 = Infinity; 

        // set n1 and w1 to shortest weight 
        for (const k in min) {
            let v = min[k]; 
            [n1, w1] = v < w1 ? [k, v] : [n1, w1];
            console.log('k,v: ', [k, v] );
        };

        delete min[n1]; 
        console.log('min2: ', min); 

        // console.log('min: ', min); 
        console.log('n1, w1: ', [n1,w1]); 

        // check if the node is already in shortestPath stack
        const shortestNodes = [...shortestPath.keys()];
        if (shortestNodes.includes(n1)) continue;

        // if it's not in shortestPath then set the node value in shortest to the weight
        shortestPath.set(n1, w1); 
        // console.log('n1: ', n1); 

        console.log('adj: ', adj); 
        // iterate through adj[node]
        adj[n1].forEach((n2,w2) => {
           if (!shortestNodes.includes(n2)) {
            min[n2] = w1 + w2;
        }
        });

    }

    for (let i=0; i < n; i++) {
        if (!shortestPath.includes(i)) shortest[i] = -1
    }

    return shortestPath; 

}

// Test case
// const n = 5; // number of vertices
// const src = 0; // source vertex
// const shortestPath = dijkstra_neetCode(n, edges, src);

// console.log(`Shortest paths from vertex ${src}:`);
// for (let [node, distance] of shortestPath) {
//     console.log(`Vertex ${node}: ${distance}`);
// }

// Exepcted
// Shortest paths from vertex 0:
// Vertex 0: 0
// Vertex 1: 7
// Vertex 2: 3
// Vertex 3: 9
// Vertex 4: 5

// Version from Medium
// given only graph and start, find shortest path to every other node

const graph = {
    A: { B: 1, C: 4 },       // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
    B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};

// how can this be updated to take in a third parameter for end node? 
const dijkstra = (graph, start) => {
    
    let distances = {}; // keep track of shortest distance from start to other nodes
    let visited = new Set(); // all visited nodes
    let nodes = Object.keys(graph); // keys in graph

    // first set distance as inf for every node
    for (let node of nodes) {
        distances[node] = Infinity; 
    }

    // Set start node distance as 0
    distances[start] = 0; 

    // Run loop until all nodes are visited
    while (nodes.length) {
        // now that we have a starting node, we can sort by distance
        nodes.sort((a,b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();                    // pops front node to get the closes node

        // if distances is infinity, then remaining nodes are unreachable
        if (distances[closestNode] === Infinity) break;

        // mark node as visited
        visited.add(closestNode);

        // loop through neighbornodes
        for ( let neighbor in graph[closestNode] ) {

            // if not visted, calculate distance of closest node to it's neighbors
            if (!visited.has(neighbor)) {
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];

                // if new distances is shorter than previously known distance to neighbor
                // then update the shortest distance to the neighbor
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
                
            }
        };
    }

    return distances;
}

console.log(dijkstra(graph, "A")); // Outputs: { A: 0, B: 1, C: 3, D: 4 }

process.exit();
