import gendiff from '../src'

test('diff', () => {
	exepect(gendiff(after.json, before.json)).toEqual(/__fixtures__/testPlain.txt);
})