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
        // sort the integers into ascending order and remove duplicate integers
        let sortAndCleanArray = array.sort();
        sortAndCleanArray = array.filter((num, index) => {
            return array.indexOf(num) === index;
        });
        this.root = this.buildTree(sortAndCleanArray, 0, sortAndCleanArray.length - 1);
    }

    // builds the balanced binary search tree
    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.ceil((start + end) / 2);
        let root = new Node(array[mid])

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    // inserts a value at the end of one of the tree branches depending on the value
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

    // deletes a value from the tree
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

    // searches for a value and returns the node if found
    find(value, root = this.root) {
        if (root === null) return "Value not found";

        if (value === root.data) return root;

        if (value < root.data) {
            return root.left = this.find(value, root.left)
        } else if (value > root.data) {
            return root.right = this.find(value, root.right)
        }
        return root;
    }

    levelOrder(callback, root = this.root) {
        if (root === null) return;

        let queue = [root];
        let levelOrderArray = [];

        while (queue.length > 0) {
            let node = queue.shift();
            levelOrderArray.push(node.data);

            if (node.left != null) {
                queue.push(node.left);
            }
            if (node.right != null) {
                queue.push(node.right);
            }

            if (typeof callback === 'function') {
                callback(node)
            }
        }
        return levelOrderArray;
    }

    inorder(callback, root = this.root, inorderArray = []) {
        if (root === null) return;

        if (root.left != null) {
            this.inorder(callback, root.left, inorderArray);
        }
        inorderArray.push(root.data);
        if (root.right != null) {
            this.inorder(callback, root.right, inorderArray);
        }

        if (typeof callback === 'function') {
            callback(root);
        }
        return inorderArray;
    }

    preorder(callback, root = this.root, preorderArray = []) {
        if (root === null) return;

        preorderArray.push(root.data)

        if (root.left != null) {
            this.preorder(callback, root.left, preorderArray)
        }
        if (root.right != null) {
            this.preorder(callback, root.right, preorderArray)
        }

        if (typeof callback === 'function') {
            callback(root)
        }

        return preorderArray;
    }

    postorder(callback, root = this.root, postorderArray = []) {
        if (root === null) return;

        if (root.left != null) {
            this.postorder(callback, root.left, postorderArray)
        }
        if (root.right != null) {
            this.postorder(callback, root.right, postorderArray)
        }
        postorderArray.push(root.data);

        if (typeof callback === 'function') {
            callback(root)
        }
        return postorderArray;
    }

    height(node, root = this.root, count = 1) {
        if (root === null) return "Not found";

        if (node === root.data) return 1;

        if (node < root.data) {
            count++
            return root.left = this.height(node, root.left, count)
        } else if (node > root.data) {
            count++
            return root.right = this.height(node, root.right, count)
        }
        console.log(count)
        console.log(root)
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
// console.log(binarySearchTree.find(3))
binarySearchTree.levelOrder()
console.log(binarySearchTree.inorder())
console.log(binarySearchTree.preorder())
console.log(binarySearchTree.postorder())
binarySearchTree.height(2);