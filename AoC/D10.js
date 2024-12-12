// https://adventofcode.com/2024/day/10
/** 
* @param {array[][]} topo
* @return {number}
*/
const ratePaths = (topo) => {
  // first we want to get all trail heads

  let trailHead = [];
  let total = 0;
  let numCol = topo.length;
  let numRow = topo[0].length;
  let stack = []; // stack of unvisited positions as [x,y]; 

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
    const firstNode = new Node(head, topo[head[0]][head[1]], -1); 
    dfs(firstNode);
  });

  function dfs(node) {
    // validation, not sure if necessary
    // if (topo[node[0], node[1]] ?? true) return; 

    if (node.value == 9) {
      total++;
      return;
    } else if (isNaN(node.value) || node.value < 0 || node.value > 9) return;

    let x = node.pos[0];
    let y = node.pos[1];
    let currVal = node.value;

    console.log('-------------');
    // console.log('curr : ', [x, y]);

    let left = topo[x - 1] ? topo[x - 1][y] : -99; // get value and verify, if none or bad pos then -1;
    let right = topo[x + 1] ? topo[x + 1][y] : -99;
    let up = topo[x][y + 1] ?? -99;
    let down = topo[x][y - 1] ?? -99;
    let dir = [up, down, right, left]; // base direction off of index
    // console.log('val: ', currVal);
    // console.log('dir: ', dir);

    for (let i = 0; i < 4; i++) {
      if (isNaN(dir[i]) || node.last == i) continue; 

      let nVal = parseInt(dir[i]);

      console.log([nVal, node.value+1]);

      if (nVal == node.value + 1) {
        switch (i) {
          case 0:
            stack.push(new Node(node.north(), currVal, 1));
          case 1:
            stack.push(new Node(node.south(), currVal, 0));
          case 2:
            stack.push(new Node(node.east(), currVal, 3));
          case 3:
            stack.push(new Node(node.west(), currVal, 2));
        }
      }
    }
    console.log('stack: ', stack);

    while (stack.length > 0) {
      dfs(stack.pop(), stack);
    }
  }

  return total;
};

class Node {
  /** 
  * @param {number[]} ps position as [x,y]
  * @param {number} val value of node.
  */
  constructor(ps, val, prev) {
    this.pos = ps;
    this.value = val.isNaN ? -99 : parseInt(val);
    this.last = prev;

    this.left = [ps[0] - 1, ps[0]];
    this.right = [ps[0] + 1, ps[0]];
    this.up = [ps[0], ps[0] + 1];
    this.down = [ps[0], ps[0] - 1];
  }
  // these return position as [x,y] 
  /**
   * @return {number[]}
   */
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
