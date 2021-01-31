import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
};

const parseFile = (filepath) => {
  const fileType = path.extname(filepath).slice(1);
  const fileData = fs.readFileSync(filepath, 'utf-8');
  return parsers[fileType](fileData);
};

export default parseFile;
