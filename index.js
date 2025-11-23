class Node {
  constructor(data) {
    this.data = data,
    this.left = null;
    this.right = null; 
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray)
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const midPoint = Math.floor(sortedArray.length / 2);
    const newNode = Node(sortedArray[midPoint]);
    newNode.left = this.buildTree(sortedArray.slice(0, midPoint));
    newNode.right = this.buildTree(sortedArray.slice(midPoint + 1));
    return newNode;
  }
}