import path from 'path';
import fs from 'fs';
import parse from './parsers';
import buildAst from './builderAst';
import renderFormat from './formatters';

export default (filePath1, filePath2, format) => {
  const dataFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataFile2 = fs.readFileSync(filePath2, 'utf8');

  const extensionDataFile1 = path.extname(filePath1);
  const extensionDataFile2 = path.extname(filePath2);

  const fileTypeD1 = extensionDataFile1.slice(1);
  const fileTypeD2 = extensionDataFile2.slice(1);

  const parsedData1 = parse(fileTypeD1, dataFile1);
  const parsedData2 = parse(fileTypeD2, dataFile2);

  const ast = buildAst(parsedData1, parsedData2);

  return renderFormat(ast, format);
};
