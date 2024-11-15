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
  
        if (!this.isValid(root.left, root.val, this.left_check) ||
            !this.isValid(root.right, root.val, this.right_check)) {
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

        if (!check.call(this, root.val, limit)) { // check.call is used here insead of calling check(this, root.val, limit) so  
            return false;                         // the context of 'this' is included. However running with 
        }                                         // check( root.val, limit) still works
        
        return this.isValid(root.left, limit, check) &&
               this.isValid(root.right, limit, check);
    }
  }


// Depth First Search
// Time: O(n)
// Space: O(n)
const isValidBST_DFS = (root) => {
    isValidBST(root) {
        console.log('root: ', root); 
        const isValid = (node, lParent, rParent) => {
            if (!node) return true
            if (!(lParent < node.val && node.val < rParent)) return false

            return ((isValid(node.left, lParent, node.val)) 
                    && isValid(node.right, node.val, rParent)) 
        }

        return isValid(root, -Infinity, Infinity);
    }
}

const isValidBST_BFS = (root) => {
    if (root === null) {

    }
}