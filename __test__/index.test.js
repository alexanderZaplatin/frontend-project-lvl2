import gendiff from '../src';


const beforeJson = `${__dirname}/__fixtures__/before.json`;
const afterJson = `${__dirname}/__fixtures__/after.json`;
const beforeYaml = `${__dirname}/__fixtures__/before.yml`;
const afterYaml = `${__dirname}/__fixtures__/after.yml`;
const afterIni =`${__dirname}/__fixtures__/after.ini`;
const beforeIni = `${__dirname}/__fixtures__/before.ini`;
const bigBeforeJson = `${__dirname}/__fixtures__/bigBefore.json`;
const bigAfterJson = `${__dirname}/__fixtures__/bigAfter.json`;

const diffBtoA = [
'{',
	'+ timeout:20', 
 	'- timeout:50',
 	'+ verbose:true',
  '  host:hexlet.io',
 	'- proxy:123.234.53.22',
	'- follow:false',
'}'
].join('\n');


const diffBigBtoA = [
'{',
'    common: {',
'      + follow: false',
'        setting1: Value 1',
'      - setting2: 200',
'      - setting3: true',
'      + setting3: {',
'            key: value',
'        }',
'      + setting4: blah blah',
'      + setting5: {',
'            key5: value5',
'        }',
'        setting6: {',
'            key: value',
'          + ops: vops',
'        }',
'    }',
'    group1: {',
'      - baz: bas',
'      + baz: bars',
'        foo: bar',
'      - nest: {',
'            key: value',
'        }',
'      + nest: str',
'    }',
'  - group2: {',
'        abc: 12345',
'    }',
'  + group3: {',
'        fee: 100500',
'    }',
'}'
].join('\n');




//test.each([[beforeJson, afterJson], [beforeYaml, afterYaml], [beforeIni, afterIni]])('TEST %#', (b, a) => {
//	expect(gendiff(b, a)).toEqual(diffBtoA);
//});

test.each([[bigBeforeJson, bigAfterJson]])('TEST BIG DATA', (b, a) => {
expect(gendiff(b, a)).toEqual(diffBigBtoA);
});