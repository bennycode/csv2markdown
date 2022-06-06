import {parseCSVTableRow} from './parseCSVTableRow';

describe('parseCSVTableRow', () => {
  it('detects comma-separated values', () => {
    const values = parseCSVTableRow('Limit,SELL,0.1337100000');
    expect(values.length).toBe(3);
  });

  it('detects comma-separated values that include commas', () => {
    const values = parseCSVTableRow('Limit,SELL,"58,133.7000000000"');
    expect(values.length).toBe(3);
  });

  it('returns an empty array when the input is empty', () => {
    const values = parseCSVTableRow('');
    expect(values.length).toBe(0);
  });
});
