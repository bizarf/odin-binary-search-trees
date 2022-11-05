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
        if (root === null) return null;

        if (value === root.data) return root;

        if (value < root.data) {
            return root.left = this.find(value, root.left)
        } else if (value > root.data) {
            return root.right = this.find(value, root.right)
        }
        return root;
    }

    // returns a level order array
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

    // returns an inorder array
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

    // returns a preorder array
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

    // returns a postorder array
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

    // returns the height of provided node in the tree
    height(node, root = this.find(node)) {
        if (root === null) return 0;

        let left = this.height(node, root.left);
        let right = this.height(node, root.right);
        return Math.max(left, right) + 1;
    }

    // returns the depth of the provided node in the tree
    depth(node, root = this.root, depth = 0) {
        if (root === null) return 0;
        if (node < root.data) {
            return this.depth(node, root.left, depth + 1)
        }
        if (node > root.data) {
            return this.depth(node, root.right, depth + 1)
        }
        return depth
    }

    // checks to see if the tree is balanced. If difference between branches is greater than 1, then returns false. 
    isBalanced(root = this.root) {
        if (root === null) return false;

        let left = this.height(root, root.left);
        let right = this.height(root, root.right);
        if (Math.abs(left - right) <= 1) {
            return true;
        } else {
            return false;
        }
    }

    // function to rebalance the array if it is unbalanced
    rebalance() {
        let updatedArray = this.inorder();
        if (this.isBalanced() === true) {
            return;
        } else {
            this.root = null;
            this.root = this.buildTree(updatedArray, 0, updatedArray.length - 1);
        }
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

export {
    Tree,
    prettyPrint
};