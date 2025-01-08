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
  let peaks = new Map(); // keep track of which peaks have been visited.

  for (let i = 0; i < numCol; i++) {
    for (let j = 0; j < numRow; j++) {
      if (topo[i][j] == 0) trailHead.push([i, j]);
    }
  }

  // console.log('trailHead: ', trailHead);

  // run dfs on each trail head
  trailHead.forEach((head) => {
    // stack of unvisited nodes

    // when at a node, we want to check each direction (up, down, left, right) for a valid step forward, then push those steps onto the stack.
    // we can do this recursively pretty easil, recursive search is inherently dfs.
    const firstNode = new Node(head, topo[head[0]][head[1]], -1);
    peaks = new Map(); // reinitialize to empty array after each trailhead.
    dfs(firstNode, peaks);

    // console.log('uniq: ', peaks);
    let keys = [...peaks.keys()];

    // console.log('keys: ', keys.length); 
    // totals.push(keys.length);
    console.log('types: ', [typeof total ,typeof keys.length]);

    // remove duplicates before getting size; 
    let a = parseInt(total);
    let b = parseInt(keys.size); 
    console.log('total: ', parseInt(a) , parseInt(b));
    console.log('totalBefore: ', total);

    total = a + b
    console.log('totalAfter: ', total);

  });

  /**
   * @param {Node} node
   * @returns
   */
  function dfs(node, peaks) {
    // validation, not sure if necessary
    // if (topo[node[0], node[1]] ?? true) return;
    let x = node.pos[0];
    let y = node.pos[1];

    if (node.value == 9) {
      if (!peaks.has(`${x}${y}`)) {
        peaks.set(`${x}${y}`, [x, y]);
        // total++;  removed since includes doesnt work here
      }
      return;

    } else if (isNaN(node.value) || node.value < 0 || node.value > 9) {
      return;
    }

    // get values of neightbors
    let left = topo[x - 1] ? topo[x - 1][y] : -99; // get value and verify, if none or bad pos then -1;
    let right = topo[x + 1] ? topo[x + 1][y] : -99;
    let up = topo[x][y - 1] ?? -99;
    let down = topo[x][y + 1] ?? -99;
    let dir = [up, down, right, left]; // base direction off of index
    // console.log('val: ', currVal);
    // console.log('dir: ', dir);

    for (let i = 0; i < 4; i++) {
      if (isNaN(dir[i]) || node.last == i) continue;

      let nVal = parseInt(dir[i]);

      if (nVal == node.value + 1) {
        switch (i) {
          case 0:
            stack.push(new Node(node.north(), nVal, 1));
            continue;
          case 1:
            stack.push(new Node(node.south(), nVal, 0));
            continue;
          case 2:
            stack.push(new Node(node.east(), nVal, 3));
            continue;
          case 3:
            stack.push(new Node(node.west(), nVal, 2));
            continue;
        }
      }
    }

    while (stack.length > 0) {
      dfs(stack.pop(), peaks);
    }
  }

  console.log('END: ', total); 

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

    this.left = [ps[0] - 1, ps[1]];
    this.right = [ps[0] + 1, ps[1]];
    this.up = [ps[0], ps[1] - 1];
    this.down = [ps[0], ps[1] + 1];
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
    return this.right;
  }

  west() {
    return this.left;
  }
}

// first thing we want to do is turn the data into a valid array

const dataToArray = (data) => {
  // make sub aray when there's a new line
  let rows = data.trim().split("\n");

  // make arrays of characters from rows
  let array = rows.map((row) => row.split(""));
  // console.log("data: \n", array[0][0]);

  // inverse so we can use dat[x][y]
  let transposedArray = array[0].map((_, colIndex) =>
    array.map((row) => row[colIndex])
  );
  return transposedArray;
};

// 10..9..
// 2...8..
// 3...7..
// 4567654
// ...8..3
// ...9..2
// .....01
// const data = "10..9..\n2...8..\n3...7..\n4567654\n...8..3\n...9..2\n.....01";

// 89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732
const data =
  "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732";
console.log(ratePaths(dataToArray(data)));
/**
totals:  [
  5, 10, 30, 31, 55,
  65, 69, 73, 81
]
 */

// totals 3 and 5 should not jump up more than 10;
// TODO: we only count 1 path to each 9. Currently we are counting all paths to reach all 9's.


/** Code pad
 * // @param {array[][]} topo 
// @return {number} 
const ratePaths = (topo) => {
  // first we want to get all trail heads

  let trailHead = [];
  let total = 0;


  for (let i = 0; i < topo.length; i++) {
    for (let j = 0; j < topo[0].length; j++) {
      if (topo[i][j] == 0) trailHead.push([i, j]);
    }
  }

  console.log(trailHead);

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
      let left = topo[i - 1][j];
      let right = topo[i + 1][j];
      let up = topo[i][j + 1];
      let down = topo[i][j - 1];
      let directions = [left, right, up, down];


    }

  })

  return -1;
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

*/