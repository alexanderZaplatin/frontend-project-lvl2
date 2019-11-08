import gendiff from '../src';


const beforeJson = `${__dirname}/__fixtures__/before.json`;
const afterJson = `${__dirname}/__fixtures__/after.json`;
const beforeYaml = `${__dirname}/__fixtures__/before.yml`;
const afterYaml = `${__dirname}/__fixtures__/after.yml`;
const afterIni =`${__dirname}/__fixtures__/after.ini`;
const beforeIni = `${__dirname}/__fixtures__/before.ini`;

const diffBtoA = [
	'+ timeout:20', 
 	'- timeout:50',
 	'+ verbose:true',
  '  host:hexlet.io',
 	'- proxy:123.234.53.22',
	'- follow:false',
].join('\n');

test.each([[beforeJson, afterJson], [beforeYaml, afterYaml], [beforeIni, afterIni]])('TEST %#', (b, a) => {
	expect(gendiff(b, a)).toEqual(diffBtoA);
});