import _ from 'lodash';

const checkKey = (key, obj1, obj2) => {
  const valueObj1 = obj1[key];
  const valueObj2 = obj2[key];

  if (_.isObject(valueObj1) && _.isObject(valueObj2)) {
    return { key, value: generateTree(valueObj1, valueObj2), status: 'withChildren' };
  }

  if (key in obj1 && !(key in obj2)) {
    return { key, value: valueObj1, status: 'deleted' };
  }

  if (!(key in obj1) && key in obj2) {
    return { key, value: valueObj2, status: 'added' };
  }

  if (valueObj1 === valueObj2) {
    return { key, value: valueObj2, status: 'unchanged' };
  }

  return {
    key, value: valueObj2, oldValue: valueObj1, status: 'changed',
  };
};

const generateTree = (obj1, obj2) => {
  const jointKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  return jointKeys.flatMap((key) => checkKey(key, obj1, obj2));
};

export default generateTree;
