const generateIndent = (count) => ' '.repeat(count);

const checkNode = (obj) => {
  if (obj.children) {
    const children = obj.children.map((newObj) => checkNode(newObj)).join('\n');
    return `${generateIndent(obj.depth)}${obj.key}: {\n${children}\n${generateIndent(obj.depth)}}`;
  }
  if (obj.status === 'unchanged') {
    return `${generateIndent(obj.depth + 2)}${obj.key}: ${obj.value}`;
  }
  if (obj.status === 'changed') {
    return `${generateIndent(obj.depth)}- ${obj.key}: ${obj.oldValue}\n${generateIndent(obj.depth)}+ ${obj.key}: ${obj.value}`;
  }
  if (obj.status === 'deleted') {
    return `${generateIndent(obj.depth)}- ${obj.key}: ${obj.value}`;
  }
  if ()
  return `${generateIndent(obj.depth)}+ ${obj.key}: ${obj.value}`;
};

const render = (tree) => {
  const arrWithDiffs = tree.map((node) => checkNode(node));
  return `{\n${arrWithDiffs.join('\n ')}\n}`;
};

export default render;
