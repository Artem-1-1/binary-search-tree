leftChildclass Node {
  constructor(data) {
    this.data = data,
    this.leftChild = null;
    this.rightChild = null; 
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


}