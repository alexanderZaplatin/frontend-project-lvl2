import fs from 'fs';
import gendiff from '../src';


const getPathBefore = (fileFormat) => `${__dirname}/__fixtures__/before${fileFormat}`;
const getPathAfter = (fileFormat) => `${__dirname}/__fixtures__/after${fileFormat}`;
const getResultFile = (expectedFixture) => fs.readFileSync(`${__dirname}/__fixtures__/${expectedFixture}`, 'utf8');

test.each`
fileFormat 	| formatOut 	| expectedFixture
${'.ini'} 	| ${'plain'} 	| ${'plainResult.txt'}
${'.json'} 	| ${'nested'} | ${'nestedResult.txt'}
${'.yml'} 	| ${'json'} 	| ${'jsonResult.txt'}
`('gendiff', ({ fileFormat, formatOut, expectedFixture }) => {
	const beforeData = getPathBefore(fileFormat);
	const afterData = getPathAfter(fileFormat);

	const receivedValue = gendiff(beforeData, afterData, formatOut);
	const expectedValue = getResultFile(expectedFixture);

	expect(receivedValue).toBe(expectedValue);
});
