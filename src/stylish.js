import _ from 'lodash';

const getIndent = (count) => ' '.repeat(count);

const checkValue = (objValue) => {
  if (!(_.isObject(objValue))) {
    return objValue;
  }
  const arrWithEntries = Object.entries(objValue);
  return arrWithEntries.map(([key, value]) => `{\n${getIndent(4)}${key}: ${checkValue(value)}\n${getIndent(4)}}`);
};

const outputStrs = {
  withChildren: (key, value) => `${getIndent(4)}${key}: \n${render(value)}\n`,
  changed: (key, value, oldValue) => `${getIndent(4)}- ${key}: ${checkValue(oldValue)}\n${getIndent(4)}+ ${key}: ${checkValue(value)}`,
  unchanged: (key, value) => `${getIndent(4)}${key}: ${checkValue(value)}`,
  added: (key, value) => `${getIndent(4)}+ ${key}: ${checkValue(value)}`,
  deleted: (key, oldValue) => `${getIndent(4)}- ${key}: ${checkValue(oldValue)}`,
};

const getOutputStr = ({
  key, value, oldValue, status,
}) => outputStrs[status](key, value, oldValue, status);

const render = (tree) => {
  const arrWithDiffs = tree.flatMap((obj) => getOutputStr(obj));
  return `{\n${arrWithDiffs.join('\n ')}\n}`;
};

export default render;
