
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Tree is binary but not binary search tree so values can be anything. 

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // given a binary tree, return lowest common ancestory of p and q.

    // this is not a binary search tree so values can be anything.
    // input is all tree nodes, return value is a tree node. 

    // keep track of path with a stack, use recursion to track path w/o multiple stacks.
    console.log('root      : ', root);
    
    if (!root) return root;
    if (root === p || root === q) return root;
    let resL = lowestCommonAncestor(root.left, p, q);
    let resR = lowestCommonAncestor(root.right, p, q);
    console.log('resL, resR: ', [resL, resR]);
    return (resL && resR) ? root : (resL || resR);
};

// this solution is recursive, DFS
// lowestCommonAncestor fn() will run until it finds a target value to return or reaches the end and returns null. 
// once we find one value, we keep checking every subtree until the end. If no value is found in the other sub trees then the one found must be LCA
// if the values are on opposite sides, the target value will bubble back up the recursion stack until it reachest to top where resL and resR valid are compared to return root