import _ from 'lodash';

const generateIndent = (count) => ' '.repeat(count);

const stringify = (value) => {
  if (_.isObject(value)) {
    const object = Object.entries(value);
    return object.map(([key, value]) => (_.isObject(value) ? stringify(value) : `${key}: ${value}`)).join('\n');
  }
  return `${value.key}: ${value.value}`;
};

const checkNode = (node) => {
  if (node.isNode) {
    if (node.children) {
      const children = node.children.map((newObj) => checkNode(newObj)).join('\n');
      return `${node.key}: {\n${children}\n}`;
    }
    return `${node.key}: {\n${stringify(node.value)}\n}`;
  }

  if (node.status === 'unchanged') {
    return `${generateIndent(node.depth + 2)}${node.key}: ${node.value}`;
  }
  if (node.status === 'changed') {
    return `${generateIndent(node.depth)}- ${node.key}: ${node.oldValue}\n${generateIndent(node.depth)}+ ${node.key}: ${node.value}`;
  }
  if (node.status === 'deleted') {
    return `${generateIndent(node.depth)}- ${node.key}: ${node.value}`;
  }
  if (node.status === 'added') return `${generateIndent(node.depth)}+ ${node.key}: ${node.value}`;
};

const render = (tree) => {
  const arrWithDiffs = tree.map((node) => checkNode(node));
  return `{\n${arrWithDiffs.join('\n ')}\n}`;
};

export default render;
