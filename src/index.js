import parseFile from './parsers.js';
import render from './stylish.js';
import generateTree from './generate-tree.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const tree = generateTree(file1, file2);
  const result = render(tree);
  console.log(tree);
  console.log(result);
  return result;
};

export default genDiff;
