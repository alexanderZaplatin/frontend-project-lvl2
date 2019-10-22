#!/usr/bin/env node

import commander from 'commander';

const program = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {});

  program.parse(process.argv);
