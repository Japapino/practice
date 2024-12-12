// @param {array[][]} topo 
// @return {number} 
const ratePaths = (topo) => {
  // first we want to get all trail heads

  let trailHead = [];
  let total = 0;
  let numRow = topo.length(); 
  let numCol = topo[0].length();


  for (let i = 0; i < topo.length; i++) {
    for (let j = 0; j < topo[0].length; j++) {
      if (topo[i][j] == 0) trailHead.push([i, j]);
    }
  }

  trailHead.forEach((head) => {

    // stack of unvisited nodes
    let unvisited = [];

    // when at a node, we want to check each direction (up, down, left, right) for a valid step forward, then push those steps onto the stack.
    // we can do this recursively pretty easil, recursive search is inherently dfs. 
    let [i, j] = head; // set position to trail head
    while (unvisited[0]) {
      // check each direction: 
      // 1. is the value in this next cell +1 of the current value? if yes push 
      let currVal = topo[i][j];
      let left = topo[i - 1][j] ?? -1;
      let right = topo[i + 1][j] ?? -1;
      let up = topo[i][j + 1] ?? -1;
      let down = topo[i][j - 1] ?? -1;
      let dir = [ up, down, right, left,]; // base direction off of index

      for (let i = 0; i < 4; i++) {
        if (dir[i] == -1) continue; 
        if (dir[i] == currVal +1) {
          switch (i) {
            case 0: unvisited.push(currVal.north());
            case 1: unvisited.push(currVal.south());
            case 2: unvisited.push(currVal.east());
            case 3: unvisited.push(currVal.west());
          }
        }
      }

    }

  })

  return -1;
}

class node {
  constructor(position) {
    this.pos = position;
  }

  //@param {number[]}
  set(xy) {
    this.pos = xy;
  }

  north() {
    return [this.pos[0], this.pos[1]-1] ?? [-1,-1];
  }

  south() {
    return this.pos(pos[0]+1, pos[1]+1) ?? [-1,-1];
  }

  east() {
    return this.pos(pos[0]+1, pos[1]+1) ?? [-1,-1];
  }

  west() {
    return this.pos(pos[0]-1, pos[1]-1) ?? [-1,-1];
  }

}

// @params {number[][]} dir;
// @params {number} curr;
// @return {number[][]}
function lookAround(dir, curr) {
  let res = [];

  dir.forEach((v) => {
    if (v == curr + 1) {
      res.push(v);
    }
  });

};

// first thing we want to do is turn the data into a valid array 

const dataToArray = (data) => {

  // make sub aray when there's a new line
  let rows = data.trim().split('\n');

  // make arrays of characters from rows
  let array = rows.map((row) => row.split(''));
  console.log('data: \n', array[0][0]);
  return array;
}

// 10..9..
// 2...8..
// 3...7..
// 4567654
// ...8..3
// ...9..2
// .....01
const data =
  '10..9..\n2...8..\n3...7..\n4567654\n...8..3\n...9..2\n.....01';

console.log(ratePaths(dataToArray(data)));