import {
    Node,
    Tree
} from './binary-search-trees.js';

const generateRandomArray = (size) => {
    return Array.from(Array(size)).map(x => Math.floor(Math.random() * 1000));
}

let randomArray = generateRandomArray(10);
const binarySearchTree = new Tree(randomArray);