import { repeat, space } from './spaces';
import stringify from './stringify';

const sign = (action) => {
  const signs = {
    added: '+',
    deleted: '-',
    inside: ' ',
    nothing: ' ',
    updated: ' ',
  };
  return signs[action];
};

const render = (ast, level = 0) => {
  const res = ast.map((data) => {
    if (data.action === 'inside') {
      if (level > 0) {
        return `${repeat(8)}${data.key}: ${render(data.children, level + 1)}`;
      }
      return `${repeat(4)}${data.key}: ${render(data.children, level + 1)}`;
    }
    if (level === 2) {
      return `${repeat(10)}${sign(data.action)} ${data.key}: ${data.valueAfter}`;
    }
    if (data.action === 'updated') {
      return `${repeat(6)}- ${data.key}: ${stringify(data.valueBefore)}\n${repeat(6)}+ ${data.key}: ${stringify(data.valueAfter)}`;
    }
    if (level > 0) {
      return `${repeat(6)}${sign(data.action)} ${data.key}: ${stringify(data.valueAfter, level)}`;
    }
    if (level === 0) {
      return `${repeat(2)}${sign(data.action)} ${data.key}: ${stringify(data.valueAfter, level)}`;
    }
    return `${repeat(10)}${sign(data.action)}${data.key}: ${stringify(data.valueAfter, level)}`;
  });
  return `{\n${res.join('\n')}\n${space(level)}}`;
};

export default render;
