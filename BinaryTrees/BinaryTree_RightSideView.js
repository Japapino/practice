// You are given the root of a binary tree. Return only the values of the nodes that are visible from the right side of the tree, ordered from top to bottom.
// In the tree below, result is [1,3]

//      1
//     / \
//    2   3

// Non recrusive BFS
const rightSideView_BFS = (root) => {
  if (!root) return [];
  if (!root.left && !root.right) return [root.val];

  const result = [];
  const unvisited = new Queue();

  unvisited.push(root);

  while (!unvisited.isEmpty()) {
    let right = null;
    const len = unvisited.size();

    for (let i = 0; i < len; i++) {
      // this loop maintains the length of that level, which is also the width of that level.
      const node = unvisited.pop(); // len only increases after all sibling nodes are checked and their children are added.
      if (node) {
        right = node;
        unvisited.push(node.left);
        unvisited.push(node.right);
      }
    }
    if (right) {
      result.push(right.val);
    }
  }

  return result;
};

// Recursive DFS
const rightSideView_DFS = (root) => {
  let result = [];

  function dfs(node, depth) {
    if (!node) return;
    if (result.length === depth) {
      // only nodes added are when the depth and length are equal so at depth 1,
      result.push(node.val); // since right is always ran first the length will increase when we add the right most or first ran in most cases.
    }

    dfs(node.right, depth + 1); // right will always run first, and depth only increments the further down right we go.
    dfs(node.left, depth + 1);
  }

  dfs(root, 0);

  return result;
};

// basic recursive DFS
const recursive_dfs_basic = (root) => {
  // this is depth first because the right child of every node will be explored first.
  function dfs(node) {
    if (!node) return;

    if (node) {
      // some logic
      dfs(node.right);
      dfs(node.left);
    }
  }
};

// recursion is inhereitly DFS, so making a recurisve BFS requires more modifications
const recursive_bfs_basic = (root) => {
  
    function run_bfs(node) {
    if (root === null) return;

    const queue = [root];
    return this.bfs(root, queue);
  }

  function bfs(queue) {
    if (queue.length === 0) return;
    const node = queue.shift();
    if (node) {
      // some logic
    }
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }

    return this.bfs(queue);
  }

  this.run_bfs(root);
};

class Solution_BFS_Recursive {
  // Breadth First Search using a recursive approach
  // O(n) Time
  // O(n) Space for all solutions

  isValidBST(root) {
    if (root === null) {
      return true;
    }

    // Initialize the queue with the root node and its bounds
    const queue = [[root, -Infinity, Infinity]];
    return this.bfs(queue);
  }

  bfs(queue) {
    if (queue.length === 0) {
      return true;
    }

    const [node, left, right] = queue.shift();

    if (!(left < node.val && node.val < right)) {
      return false;
    }

    if (node.left) {
      queue.push([node.left, left, node.val]);
    }
    if (node.right) {
      queue.push([node.right, node.val, right]);
    }

    // Recursively call bfs with the updated queue
    return this.bfs(queue);
  }
}
