import os from 'node:os';

export function createMarkdownTableRow(values: string[], eol: string = os.EOL): string {
  const tableRow = values.join(' | ');
  return `| ${tableRow} |${eol}`;
}
