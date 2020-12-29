import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const normalizeFilepath = (filepath) => {
  if (filepath[0] === '/') {
    return filepath;
  }
  if (filepath.slice(0, 2) === '..') {
    return path.resolve(`${process.cwd()}${filepath.slice(2)}`);
  }
  return path.resolve(`${process.cwd()}${filepath.slice(1)}`);
};

const parseFile = (filepath) => {
  if (path.extname(filepath) === '.yml') {
    return yaml.safeLoad(fs.readFileSync(normalizeFilepath(filepath)), 'utf-8');
  }
  return JSON.parse(fs.readFileSync(normalizeFilepath(filepath)), 'utf-8');
};

export default parseFile;
