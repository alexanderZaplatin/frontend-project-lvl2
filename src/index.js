import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './formatters/render';
import astBuild from './ast';
import renderFormat from './formatters'

 export default (filePath1, filePath2, format) => {
    const d1 = fs.readFileSync(filePath1, 'utf8');
    const d2 = fs.readFileSync(filePath2, 'utf8');


    const data1 = parse(path.extname(filePath1), d1);
    const data2 = parse(path.extname(filePath2), d2);

    const ast = astBuild(data1, data2);

    return renderFormat(ast ,format);
 };