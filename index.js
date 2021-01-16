import parseFile from './parsers.js';
import render from './stylish.js';

const checkKey = (key, obj1, obj2, depth) => {
  if (key in obj1 && key in obj2) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const newJointKeys = Object.keys({ ...obj1[key], ...obj2[key] }).sort();
      const indentForOperator = 2;
      const children = newJointKeys
        .map((newKey) => checkKey(newKey, obj1[key], obj2[key], depth + indentForOperator));
      return {
        key, status: 'unchanged', children, depth,
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key, value: obj1[key], status: 'unchanged', depth,
      };
    }
    return {
      key, value: obj2[key], oldValue: obj1[key], status: 'changed', depth,
    };
  }
  if (key in obj1 && !(key in obj2)) {
    return {
      key, value: obj1[key], status: 'deleted', depth,
    };
  }
  return {
    key, value: obj2[key], status: 'added', depth,
  };
};

const generateTree = (obj1, obj2) => {
  const startDepth = 4;
  const jointKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  return jointKeys.flatMap((key) => checkKey(key, obj1, obj2, startDepth));
};

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
