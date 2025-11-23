import { Tree } from "./index.js";

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const tree = new Tree(randomArray(20));

console.log(tree.isBalanced());

console.log(tree.levelOrderForEach());
console.log(tree.inOrderForEach());
console.log(tree.preOrderForEach());
console.log(tree.postOrderForEach());