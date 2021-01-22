import _ from 'lodash';
import parseFile from './parsers.js';
import render from './stylish.js';

const checkKey = (key, obj1, obj2) => {
  if (key in obj1 && key in obj2) {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const newJointKeys = Object.keys({ ...obj1[key], ...obj2[key] }).sort();
      const children = newJointKeys
        .map((newKey) => checkKey(newKey, obj1[key], obj2[key]));
      return {
        key, isNode: true, children,
      };
    }

    if (_.isObject(obj1[key]) || _.isObject(obj2[key])) {
      return {
        key, value: obj2[key], oldValue: obj1[key], isNode: _.isObject(obj2[key]), status: 'changed',
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        key, value: obj2[key], isNode: false, status: 'unchanged',
      };
    }
    return {
      key, value: obj2[key], oldValue: obj1[key], isNode: false, status: 'changed',
    };
  }

  if (key in obj1 && !(key in obj2)) {
    return {
      key, value: obj1[key], isNode: _.isObject(obj1[key]), status: 'deleted',
    };
  }
  return {
    key, value: obj2[key], isNode: _.isObject(obj2[key]), status: 'added',
  };
};

const generateTree = (obj1, obj2) => {
  const jointKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  return jointKeys.flatMap((key) => checkKey(key, obj1, obj2));
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
