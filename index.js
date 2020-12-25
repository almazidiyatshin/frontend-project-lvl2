import fs from 'fs';
import path from 'path';

const normalizeFilepath = (filepath) => (filepath[0] === '/' ? path.resolve(`${process.cwd()}${filepath}`) : filepath);

const checkKey = (key, obj1, obj2) => {
  if (key in obj1 && key in obj2) {
    if (obj1[key] === obj2[key]) {
      return `  ${key}: ${obj1[key]}`;
    }
    return `- ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
  }
  if (key in obj1 && !(key in obj2)) {
    return `- ${key}: ${obj1[key]}`;
  }
  return `+ ${key}: ${obj2[key]}`;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(normalizeFilepath(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(normalizeFilepath(filepath2)));
  const keys = Object.keys({ ...file1, ...file2 }).sort();
  const arrWithDiffs = keys.map((key) => checkKey(key, file1, file2));
  console.log(`{\n ${arrWithDiffs.join('\n ')}\n}`);
};

export default genDiff;