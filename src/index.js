import path from 'path';
import fs from 'fs';
import parse from './parsers';
import astBuild from './ast';
import renderFormat from './formatters';

export default (filePath1, filePath2, format) => {
  const d1 = fs.readFileSync(filePath1, 'utf8');
  const d2 = fs.readFileSync(filePath2, 'utf8');

  const extensionD1 = path.extname(filePath1);
  const extensionD2 = path.extname(filePath2);

  const fileTypeD1 = extensionD1.slice(1);
  const fileTypeD2 = extensionD2.slice(1);

  const data1 = parse(fileTypeD1, d1);
  const data2 = parse(fileTypeD2, d2);

  const ast = astBuild(data1, data2);

  return renderFormat(ast, format);
};
