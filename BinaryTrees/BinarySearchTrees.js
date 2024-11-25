// Given the root of a binary tree, return true if it is a valid binary search tree, otherwise return false.

// A valid binary search tree satisfies the following constraints:

//     The left subtree of every node contains only nodes with keys less than the node's key.
//     The right subtree of every node contains only nodes with keys greater than the node's key.
//     Both the left and right subtrees are also binary search trees.

// Brute Force Approach
// Time: O(n^2)
// Space: O(n)
class Solution_brute {
  /**
   * @param {number} val
   * @param {number} limit
   * @returns {boolean}
   */
  left_check(val, limit) {
    return val < limit;
  }

  /**
   * @param {number} val
   * @param {number} limit
   * @returns {boolean}
   */
  right_check(val, limit) {
    return val > limit;
  }

  /**
   * @param {TreeNode} root
   * @returns {boolean}
   */
  isValidBST(root) {
    if (!root) {
      return true;
    }

    if (
      !this.isValid(root.left, root.val, this.left_check) ||
      !this.isValid(root.right, root.val, this.right_check)
    ) {
      return false;
    }

    return this.isValidBST(root.left) && this.isValidBST(root.right);
  }

  /**
   * @param {TreeNode} root
   * @param {number} limit
   * @param {function} check
   * @returns {boolean}
   */
  isValid(root, limit, check) {
    if (!root) {
      return true;
    }

    if (!check.call(this, root.val, limit)) {
      // check.call is used here insead of calling check(this, root.val, limit) so
      return false; // the context of 'this' is included. However running with
    } // check( root.val, limit) still works

    return (
      this.isValid(root.left, limit, check) &&
      this.isValid(root.right, limit, check)
    );
  }
}

// Depth First Search
// Time: O(n)
// Space: O(n)
class Solution_recursive_dfs {

  isValidBST = (root) => {
    this.isValid(root, -Infinty, Infinity);
  };

  isValid = (root) => {
    const isValid = (node, lParent, rParent) => {
      if (!node) return true;
      if (!(lParent < node.val && node.val < rParent)) return false;

      return (
        isValid(node.left, lParent, node.val) &&
        isValid(node.right, node.val, rParent)
      );
    };

  };
}

// Breadth First Search
// Time: O(n)
// Space: O(n)
const isValidBST_BFS = (root) => {
  if (root === null) {
    return true;
  }

  const queue = new Queue([[root, -Infinity, Infinity]]);

  while (queue.size() > 0) {
    const [node, left, right] = queue.pop();

    if (!(left < node.val && node.val < right)) {
      return false;
    }
    if (node.left) {
      queue.push([node.left, left, node.val]);
    }
    if (node.right) {
      queue.push([node.right, node.val, right]);
    }
  }

  return true;
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