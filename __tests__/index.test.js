import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  const correct = fs.readFileSync(getFixturePath('correct'), 'utf-8');
  expect(genDiff(before, after)).toEqual(correct);
});
