import fs from 'node:fs';
import readline from 'node:readline';
import {parseCSVTableRow} from './parseCSVTableRow';
import {createMarkdownTableRow} from './createMarkdownTableRow';
import prettier from 'prettier';
import {Logger} from '@caporal/core';

export async function processFiles(inputFile: string, outputFile: string, logger: Logger): Promise<void> {
  return new Promise(async resolve => {
    const inputStream = fs.createReadStream(inputFile);
    const outputStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({
      input: inputStream,
      crlfDelay: Infinity,
    });

    let hasWrittenHeading: boolean = false;
    let maximumValues: number = 0;

    logger.info(`Parsing CSV file...`);

    for await (const line of rl) {
      const values = parseCSVTableRow(line).map(value => value.trim());
      if (hasWrittenHeading) {
        switch (values.length) {
          case maximumValues: {
            outputStream.write(createMarkdownTableRow(values));
            break;
          }
          case 0:
            // Empty line
            break;
          default:
            logger.warn(
              `Record has "${values.length}" value(s) but based on the CSV table header it should have "${maximumValues}" value(s).`,
              values
            );
            break;
        }
      } else {
        logger.info(`Writing Markdown table header...`);
        maximumValues = values.length;
        const headingSeparators = new Array(values.length).fill('---');
        outputStream.write(createMarkdownTableRow(values));
        outputStream.write(createMarkdownTableRow(headingSeparators));
        hasWrittenHeading = true;
        logger.info(`Writing Markdown table rows...`);
      }
    }

    inputStream.on('close', () => {
      outputStream.close(() => {
        logger.info(`Formatting Markdown table using Prettier...`);
        const unformatted = fs.readFileSync(outputFile, 'utf8');
        const formatted = prettier.format(unformatted, {parser: 'markdown'});
        fs.writeFileSync(outputFile, formatted, 'utf-8');
        logger.info(`Markdown file successfully written to: ${outputFile}`);
        resolve();
      });
    });
  });
}
