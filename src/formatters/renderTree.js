import _ from 'lodash/fp';

const makeIndent = (depth) => ' '.repeat(2 * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const untab = makeIndent(depth - 1);
  const tab = makeIndent(depth);
  const str = Object.keys(value).map((key) => `${tab}  ${key}: ${value[key]}`);
  const result = [str, `${untab}}`].join('\n');
  return `{\n${result}`;
};

const treeActions = {
  nested: ({ key, children }, tab, depth, func) => {
    const renderChildren = func(children, depth + 2);
    return `${tab}  ${key}: ${renderChildren}`;
  },
  unchanged: ({ key, valueAfter }, tab, depth) => `${tab}  ${key}: ${stringify(valueAfter, depth + 2)}`,
  updated: ({ key, valueBefore, valueAfter }, tab, depth) => [
    `${tab}- ${key}: ${stringify(valueBefore, depth + 2)}`,
    `${tab}+ ${key}: ${stringify(valueAfter, depth + 2)}`,
  ],
  added: ({ key, valueAfter }, tab, depth) => `${tab}+ ${key}: ${stringify(valueAfter, depth + 2)}`,
  deleted: ({ key, valueAfter }, tab, depth) => `${tab}- ${key}: ${stringify(valueAfter, depth + 2)}`,
};


const render = (ast, depth = 1) => {
  const tab = makeIndent(depth);
  const untab = makeIndent(depth - 1);
  const formatted = ast.map((node) => treeActions[node.type](node, tab, depth, render));
  return `{\n${_.flatten(formatted).join('\n')}\n${untab}}`;
};

export default render;
