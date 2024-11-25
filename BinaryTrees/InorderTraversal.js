

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// iterative
// bfs
var inorderTraversal_iterative = function(root) {
    // Given a binary tree, return an array that represents the inorder tranversal
    // inorder tranversal is: left subtree, root, right subtree

    if (!root) return [];

    if (!root.left && !root.right) return [root.val]; 

    let result = [];
    let unvisited = [root];

    while (unvisited.length > 0) {
        let node = unvisited.pop(); 

        if (node == null) continue;
        if (!isNaN(node)) {
            result.push(node);
            continue;
        }

        if (node.right != null) unvisited.push(node.right);
        unvisited.push(node.val);
        if (node.left != null) unvisited.push(node.left);

    }

    return result;
};

var inorderTraversal_recursive = function(root) {
    // Given a binary tree, return an array that represents the inorder tranversal
    // inorder tranversal is: left subtree, root, right subtree

    if (!root) return [];

    if (!root.left && !root.right) return [root.val]; 

    let result = [];

    function iot(root) {

        if (root.left) {
            iot(root.left);
        }

        result.push(root.val);

        if (root.right) {
            iot(root.right);
        }
    }

    iot(root);

    return result;
};
