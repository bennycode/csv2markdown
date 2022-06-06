export function parseCSVTableRow(input: string): string[] {
  if (input.length === 0) {
    return [];
  }
  /** @see https://stackoverflow.com/a/21106122/451634 */
  const regex = new RegExp('(?!\\B"[^"]*),(?![^"]*"\\B)');
  return input.split(regex);
}
