import remark from 'remark';
import { Node } from 'unist';

// @ts-ignore
import html from 'rehype-stringify';
// @ts-ignore
import rehype from 'remark-rehype';

const processor = remark()
  .use(rehype)
  .use(html);

export default function markdownToHTML(node: Node): string {
  return processor.stringify(node);
}
