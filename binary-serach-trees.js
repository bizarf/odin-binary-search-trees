const numberArray = [1, 6, 3, 8, 4, 2, 5, 7, 1, 7, 5, 9]

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        let sortAndCleanArray = array.sort();
        sortAndCleanArray = array.filter((num, index) => {
            return array.indexOf(num) === index;
        });
        this.root = this.buildTree(sortAndCleanArray, 0, sortAndCleanArray.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.ceil((start + end) / 2);
        let root = new Node(array[mid])

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    insert(value, root = this.root) {
        if (root === null) {
            root = new Node(value);
            return root;
        }

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    delete(value, root = this.root) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = this.delete(value, root.left);
        } else if (value > root.data) {
            root.right = this.delete(value, root.right);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);
            root.right = this.delete(root.data, root.right);
        }
        return root;
    }

    minValue(root) {
        let minValue = root.data
        while (root.let != null) {
            minValue = root.left.data;
            root = root.left;
        }
        return minValue;
    }

    find(value) {
        let currentNode = this.data;
    }

    levelOrder() {

    }

    inorder() {

    }

    preorder() {

    }

    postorder() {

    }

    height(node) {

    }

    depth() {

    }

    isBalanced() {

    }

    rebalance() {

    }
}

// visualization function to show the binary search tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}


const binarySearchTree = new Tree(numberArray);
// prettyPrint(binarySearchTree.root);
binarySearchTree.insert(10);
binarySearchTree.insert(50);
binarySearchTree.insert(25);
binarySearchTree.delete(50);
prettyPrint(binarySearchTree.root);