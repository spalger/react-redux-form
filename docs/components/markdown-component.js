import React from 'react';
import marked from 'marked';
import '../vendor/prism.js';

function formatter(match, code) {
  return `<pre class="language-jsx"><code class="language-jsx">${Prism.highlight(code.trim(), Prism.languages.jsx)}</code></pre>`;
}

const Markdown = ({ content }) => <div
  dangerouslySetInnerHTML={{
    __html: marked(content.replace(/```js([\S\s]+?)```/g, formatter))
  }} />;

export default Markdown;

export function js(string) {
  return `<pre class="language-jsx"><code class="language-jsx">${Prism.highlight(string[0].trim(), Prism.languages.jsx)}</code></pre>`;
}
