import renderPlain from './renderPlain';
import renderJson from './renderJson';
import renderTree from './renderTree';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return renderJson(ast);
    default:
      return renderTree(ast);
  }
};
