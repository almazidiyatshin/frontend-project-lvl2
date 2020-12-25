#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(genDiff)
  .parse(process.argv);
