import { BlockContent, Blockquote, HTML } from 'mdast';
import BaseWalker from '../../walker';
import html from './markdown-to-html';

const ZOEY_SAYS = 'Zoey says...';

function isZoeySays({ children }: Blockquote): boolean {
  if (children.length === 0) {
    return false;
  }

  let [firstBlock] = children;

  if (firstBlock.type !== 'paragraph') {
    return false;
  }

  let [firstParagraph] = firstBlock.children;

  return firstParagraph.type === 'text' &&
    firstParagraph.value === ZOEY_SAYS;
}

function render(nodes: BlockContent[]): HTML {
  let content = nodes.map(html).join('        \n');

  let value = `
<div class="cta">
  <div class="cta-note">
    <div class="cta-note-body">
      <div class="cta-note-heading">Zoey says...</div>
      <div class="cta-note-message">
        ${content}
      </div>
    </div>
  </div>
  <img src="/images/mascots/zoey.png" role="presentation" alt="Ember Mascot">
</div>`;

  return { type: 'html', value };
}

export default class Walker extends BaseWalker<null> {
  constructor() {
    super(null);
  }

  protected async blockquote(node: Blockquote): Promise<Blockquote | HTML> {
    if (isZoeySays(node)) {
      let children = await this.visit(node.children.slice(1));
      return render(children);
    } else {
      return node;
    }
  }
}
