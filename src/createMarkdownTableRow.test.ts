import {createMarkdownTableRow} from './createMarkdownTableRow';

describe('createMarkdownTableRow', () => {
  it('creates a table row in Markdown syntax', () => {
    const row = createMarkdownTableRow(['Europe', 'Germany', 'Berlin'], '');
    expect(row).toBe(`| Europe | Germany | Berlin |`);
  });
});
