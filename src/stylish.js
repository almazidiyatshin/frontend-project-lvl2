import _ from 'lodash';

const getIndent = (count) => ' '.repeat(count);

const checkValue = (objValue, indent) => {
  if (!_.isObject(objValue)) {
    return objValue;
  }
  const arrWithEntries = Object.entries(objValue);
  return arrWithEntries.map(([key, value]) => `\n${getIndent(indent + 6)}${key}: ${checkValue(value, indent + 4)}\n${getIndent(indent + 1)}`);
};

const outputStrs = {
  withChildren: (indent, key, value) => {
    const str = `{\n${getIndent(indent)}${key}:  {\n${render(value, indent + 1)}\n${getIndent(indent)}\n}`;
    return str;
  },
  changed: (indent, key, value, oldValue) => {
    const str = `${getIndent(indent + 1)}- ${key}: ${checkValue(oldValue, indent)}\n${getIndent(indent + 1)}+ ${key}: ${checkValue(value, indent)}`;
    return str;
  },
  unchanged: (indent, key, value) => `${getIndent(indent + 3)}${key}: ${checkValue(value, indent)}`,
  added: (indent, key, value) => `${getIndent(indent + 1)}+ ${key}: ${checkValue(value, indent)}`,
  deleted: (indent, key, oldValue) => `${getIndent(indent + 1)}- ${key}: ${checkValue(oldValue, indent)}`,
};

const getOutputStr = (obj, indent) => {
  const { key, value, oldValue, status } = obj;
  return outputStrs[status](indent, key, value, oldValue);
};

const render = (tree, indent = 4) => {
  const arrWithDiffs = tree.flatMap((obj) => getOutputStr(obj, indent));
  return `${arrWithDiffs.join('\n')}\n`;
};

export default render;
