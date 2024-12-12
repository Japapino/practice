// https://adventofcode.com/2024/day/10

// @param {array[][]} topo
// @return {number}
const ratePaths = (topo) => {
  // first we want to get all trail heads

  let trailHead = [];
  let unvisited = []; 
  let total = 0;
  let numCol = topo.length();
  let numRow = topo[0].length();

  for (let i = 0; i < numCol; i++) {
    for (let j = 0; j < numRow; j++) {
      if (topo[i][j] == 0) trailHead.push([i, j]);
    }
  }

  // run dfs on each trail head
  trailHead.forEach((head) => {
    // stack of unvisited nodes

    // when at a node, we want to check each direction (up, down, left, right) for a valid step forward, then push those steps onto the stack.
    // we can do this recursively pretty easil, recursive search is inherently dfs.
    dfs(head, total);
  });

  function dfs(node) {
    if (topo[node[0], node[1]] ?? true) return; 

    if ((topo[node[0], node[1]] ?? -1) == 9) {
      total++;
      return;
    };

    let stack = []; // stack of [x,y]
    let currVal = topo[i][j];
    let left = topo[i - 1][j] ?? -1;
    let right = topo[i + 1][j] ?? -1;
    let up = topo[i][j + 1] ?? -1;
    let down = topo[i][j - 1] ?? -1;
    let dir = [up, down, right, left]; // base direction off of index

    for (let i = 0; i < 4; i++) {
      if (dir[i] == -1) continue;
      if (dir[i] == currVal + 1) {
        switch (i) {
          case 0:
            stack.push(currVal.north());
          case 1:
            stack.push(currVal.south());
          case 2:
            stack.push(currVal.east());
          case 3:
            stack.push(currVal.west());
        }
      }
    }
  
    while (stack[0]) {
      dfs(stack.pop(), stack); 
    }
  }

  return total;
};

class node {
  constructor(ps, val) {
    this.pos = ps;
    this.value = val;
    this.left = [ps[0] - 1, ps[0]];
    this.right = [ps[0] + 1, ps[0]];
    this.up = [ps[0], ps[0] + 1];
    this.down = [ps[0], ps[0] - 1];
  }

  //@param {number[]}
  set(xy) {
    this.pos = xy;
    this.left = [ps[0] - 1, ps[0]];
    this.right = [ps[0] + 1, ps[0]];
    this.up = [ps[0], ps[0] + 1];
    this.down = [ps[0], ps[0] - 1];
  }

  // these return position as [x,y] 
  north() {
    return this.up;
  }

  south() {
    return this.down;
  }

  east() {
    return this.left;
  }

  west() {
    return this.right;
  }
}

function dfs(node) {
  if 
  let stack = []; // stack of [x,y]
  let currVal = node[i][j];
  let left = node[i - 1][j] ?? -1;
  let right = node[i + 1][j] ?? -1;
  let up = node[i][j + 1] ?? -1;
  let down = node[i][j - 1] ?? -1;
  let dir = [up, down, right, left]; // base direction off of index

  // if the next value is a 9 we need to increment the score.

  for (let i = 0; i < 4; i++) {
    if (dir[i] == -1) continue;
    if (dir[i] == currVal + 1) {
      switch (i) {
        case 0:
          stack.push(currVal.north());
        case 1:
          stack.push(currVal.south());
        case 2:
          stack.push(currVal.east());
        case 3:
          stack.push(currVal.west());
      }
    }
  }

  while (stack[0]) {
    dfs(stack.pop(), stack); 
  }
}
// first thing we want to do is turn the data into a valid array

const dataToArray = (data) => {
  // make sub aray when there's a new line
  let rows = data.trim().split("\n");

  // make arrays of characters from rows
  let array = rows.map((row) => row.split(""));
  console.log("data: \n", array[0][0]);
  return array;
};

// 10..9..
// 2...8..
// 3...7..
// 4567654
// ...8..3
// ...9..2
// .....01
const data = "10..9..\n2...8..\n3...7..\n4567654\n...8..3\n...9..2\n.....01";

console.log(ratePaths(dataToArray(data)));
