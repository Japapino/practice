/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    // given an integer 'n', return return all unique Binary Search trees which have n nodes with values 1 - n;
    // Binary Search Trees are when the root node value is larger than all nodes on the left subtree and all nodes on the right subtree. 
    // so no must be non negative, whole number. No zeros?

    // start with small examples and work our way up until we see a pattern 
    // so we see a pattern where trees(4) has all solutions of trees(3) with + node4, + all trees with 4 as root
    

    // create every tree with each n value as root. 
    // create sub tree, add nodes up to n;

    let result = [];
    let memo = new Map();

    // build trees based on left and right boundary
    // param {lbound}, left boundary or limit the sub tree values can go as low as
    // param {rbound}, right boundary or limit the subtree values can go as high as
    function buildTree(lbound, rbound) {
        if (memo.has( `${lbound}-${rbound}` )) {          // check if the subtree with these limits has already been generated
            return memo.get( `${lbound}-${rbound}` );     // if it has then return that subtree value
        }
        
        const temp = [];                                
        if (lbound > rbound) {                          // the null indicates no child, also allows the loop later on to run even though there are no childeren. 
            temp.push(null);                            
            return temp;
        } 

        for (let i = lbound; i <= rbound; i++) {        
            const left_ST = buildTree(lbound, i-1);
            const right_ST = buildTree(i+1, rbound);

            for (const left_tree of left_ST) {
                for (const right_tree of right_ST) {
                    const root = new TreeNode(i, left_tree, right_tree);
                    temp.push(root); 
                }
            }
        }

        memo.set(`${lbound}-${rbound}`, temp);
        return temp; 
    }

    if (!n) return [];
    if (n == 1) return [new TreeNode(1)];


    result = buildTree(1, n);

    return result; 
};