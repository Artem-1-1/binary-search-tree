import { BinaryTree } from "./index.js";

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const tree = new BinaryTree(randomArray(20));

console.log(tree.isBalanced());

console.log(tree.levelOrderForEach());
console.log(tree.inOrderForEach());
console.log(tree.preOrderForEach());
console.log(tree.postOrderForEach());

tree.insert(150);
tree.insert(300);
tree.insert(400);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrderForEach());
console.log(tree.inOrderForEach());
console.log(tree.preOrderForEach());
console.log(tree.postOrderForEach());

tree.prettyPrint();