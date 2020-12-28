import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

test('gendiff', () => {
  const before = readFile('before.json');
  const after = readFile('after.json');
  const correct = readFile('correct');
  expect(genDiff(before, after)).toEqual(correct);
});
