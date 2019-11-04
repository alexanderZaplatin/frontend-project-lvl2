import gendiff from '../src';


const beforeJson = `${__dirname}/__fixtures__/before.json`;
const afterJson = `${__dirname}/__fixtures__/after.json`;

const diffBtoA = [
	'+ timeout:20', 
 	'- timeout:50',
 	'+ verbose:true',
  '  host:hexlet.io',
 	'- proxy:123.234.53.22',
	'- follow:false',
].join('\n');

test('gendiff', () => {
	expect(gendiff(beforeJson, afterJson)).toEqual(diffBtoA);
});