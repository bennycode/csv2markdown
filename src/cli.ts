#!/usr/bin/env node

import {program} from '@caporal/core';
import path from 'node:path';
import {processFiles} from './processFiles';

program
  .version(process.env.npm_package_version || '0.0.0')
  .description(process.env.npm_package_description || '')
  .name(process.env.npm_package_name || 'csv2markdown')
  .option('-i, --input <input.csv>', 'CSV file that you want to convert', {
    required: true,
  })
  .option('-o, --output <output.md>', 'Markdown file that this program should create', {
    required: true,
  })
  .action(async ({options, logger}) => {
    const inputFile = path.resolve(`${options.input}`);
    const outputFile = path.resolve(`${options.output}`);
    await processFiles(inputFile, outputFile, logger);
  });

program
  .run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
