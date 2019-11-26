import fs from 'fs';
import gendiff from '../src';


const getPathBefore = (fileFormat) => `${__dirname}/__fixtures__/before${fileFormat}`;
const getPathAfter = (fileFormat) => `${__dirname}/__fixtures__/after${fileFormat}`;
const getResultFile = (fileName) => fs.readFileSync(`${__dirname}/__fixtures__/${fileName}`, 'utf8');

test.each`
fileFormat 	| formatOut 	| fileName
${'.ini'} 	| ${'plain'} 	| ${'plainResult.txt'}
${'.json'} 	| ${'nested'} | ${'nestedResult.txt'}
${'.yml'} 	| ${'json'} 	| ${'jsonResult.txt'}
`('gendiff', ({ fileFormat, formatOut, fileName }) => {
	const olD = getPathBefore(fileFormat);
	const neW = getPathAfter(fileFormat);

	const receiveValue = gendiff(olD, neW, formatOut);
	const expectedValue = getResultFile(fileName);

	expect(receiveValue).toBe(expectedValue);
});