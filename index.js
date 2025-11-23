class Node {
  constructor(data) {
    this.data = data,
    this.leftChild = null;
    this.rightChild = null; 
  }
}

export class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray)
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const midPoint = Math.floor(sortedArray.length / 2);
    const newNode = Node(sortedArray[midPoint]);
    newNode.leftChild = this.buildTree(sortedArray.slice(0, midPoint));
    newNode.rightChild = this.buildTree(sortedArray.slice(midPoint + 1));
    return newNode;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return Node(value);
    if (currentNode.value === value) return;

    if (currentNode.value < value) {
      currentNode.rightChild = this.insert(value, currentNode.right);
    } else {
      currentNode.leftChild = this.insert(value, currentNode.leftChild);
    }
    return currentNode;
  }

  remove(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;

    if (currentNode === value) return;
    else if (currentNode.value > value) {
      currentNode.leftChild = this.remove(value, currentNode.leftChild);
    } else {
      currentNode.rightChild = this.remove(value, currentNode.right);
    }
    return currentNode;
  }

  find(value, node = this.root) {
    if (node === null || node.value === value) return;

    if(node.value < value) {
      return this.find(value, node.rightChild)
    } else  {
      return this.find(value, node.leftChild);
    }   
  }

  levelOrderForEach(callback) {
    const queue = [this.root];
    const levelOrderList = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback ? callback(currentNode) : levelOrderList.push(currentNode.value);

      const enqueueList = [
        currentNode?.leftChild,
        currentNode?.rightChild
      ].filter((value) => value);
      queue.push(...enqueueList);
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  inOrderForEach(callback, node = this.root, inOrderList = []) {
    if (node === null) return;

    this.inOrderForEach(callback, node.leftChild, inOrderList);
    callback ? callback(node) : inOrderList.push(node.value);
    this.inOrderForEach(callback, node.rightChild, inOrderList)

    if (inOrderList.length > 0) return inOrderList;
  }

  preOrderForEach(callback, node = this.root, preOrderList = []) {
    if (node === null) return;

    callback ? callback(node) : preOrderList.push(node.value);
    this.preOrderForEach(callback, node.leftChild, preOrderList);
    this.preOrderForEach(callback, node.rightChild, preOrderList);

    if (preOrderList.length > 0) return preOrderList;
  }

  postOrderForEach(callback, node = this.root, postOrderList = []) {
    if (node === null) return;

    this.postOrderForEach(callback, node.leftChild, postOrderList);
    this.postOrderForEach(callback, node.rightChild, postOrderList);
    callback ? callback(node) : postOrderList.push(node.value);

    if (postOrderList.length > 0) return postOrderList;
  }

  height(node = this.root) {
    if (node === null) return;

    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);  

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.root, edgeCount = 0) {
    if (node === null) return;
    if (node.value === value) return edgeCount;

    if (node.value < value) {
      return this.depth(value, node.rightChild, edgeCount + 1);
    } else {
      return this.depth(value, node.leftChild, edgeCount + 1)
    }
  }

  isBalanced() {
    return this.#testBalance(this.root) !== -1;
  }

  rebalance() {
    const inOrderList = this.inOrderForEach();
    this.root = this.buildTree(inOrderList);
  }

  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  #testBalance(node) {
    if (node === null) return 0;

    const leftBalance = this.#testBalance(node.leftChild);
    const rightBalance = this.#testBalance(node.rightChild);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }
}