var levelOrder = function(root) {
    // param {treeNode}
    // return [][]

    if (!root) return [];

    let result = [];

    // Breadth first search 
    // use a queue to keep track of unvisited nodes, and uses a lifo method
    let unvisited = [];

    unvisited.push(root);
    while (unvisited.length > 0) {

        const len = unvisited.length; 
        let temp = [];

        for (let i = 0; i < len; i++) {
            const node = unvisited.shift(); 

            if (!node) return;

            temp.push(node.val);

            if (node.left !== null) unvisited.push(node.left); // direct null comparision runs slightly faster than simly (node.left)
            if (node.right) unvisited.push(node.right);
        }

        result.push(temp); 

    }

    return result;

}