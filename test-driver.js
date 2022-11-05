import {
    Tree,
    prettyPrint
} from './binary-search-trees.js';

const generateRandomArray = (size) => {
    return Array.from(Array(size)).map(x => Math.floor(Math.random() * 500));
}

let randomArray = generateRandomArray(5);
const binarySearchTree = new Tree(randomArray);
prettyPrint(binarySearchTree.root);
console.log('Is this tree balanced:', binarySearchTree.isBalanced())
console.log('Elements sorted by level order:', binarySearchTree.levelOrder())
console.log('Elements sorted by in order:', binarySearchTree.inorder())
console.log('Elements sorted by pre order:', binarySearchTree.preorder())
console.log('Elements sorted by post order:', binarySearchTree.postorder())

for (let i = 0; i < 10; i++) {
    binarySearchTree.insert(Math.floor(Math.random() * 500));
}
prettyPrint(binarySearchTree.root);
console.log('Is this tree balanced:', binarySearchTree.isBalanced())
binarySearchTree.rebalance()
console.log('Is this tree balanced:', binarySearchTree.isBalanced())
prettyPrint(binarySearchTree.root);
console.log('Elements sorted by level order:', binarySearchTree.levelOrder())
console.log('Elements sorted by in order:', binarySearchTree.inorder())
console.log('Elements sorted by pre order:', binarySearchTree.preorder())
console.log('Elements sorted by post order:', binarySearchTree.postorder())