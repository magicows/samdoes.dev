import Head from "next/head";
import { Header } from "@/components/nav/Header";
import { SideBar } from "@/components/nav/SideBar";

const sampleHtml = `
  <h1>Blog style guide</h1>
  <p>
    This page is a <strong>visual test</strong> for Notion-rendered HTML and the
    CSS we apply to it.
  </p>

  <h2>Links + inline code</h2>
  <p>
    Here is a link: <a class="notion-text-href" href="https://samdoes.dev">samdoes.dev</a>
    and some inline code: <code class="notion-text-code">useEffect(() => {})</code>.
  </p>

  <h2>Callout</h2>
  <div class="notion-callout">
    <span class="icon">💡</span>
    <div>
      <p><strong>Callout title</strong></p>
      <p>This is what a Notion callout often looks like.</p>
    </div>
  </div>

  <h2>Lists</h2>
  <ul>
    <li class="notion-bulleted_list_item">Bulleted item one</li>
    <li class="notion-bulleted_list_item">Bulleted item two</li>
  </ul>
  <ol>
    <li>Numbered item one</li>
    <li>Numbered item two</li>
  </ol>

  <h2>Blockquote</h2>
  <blockquote>
    <p>
      This is a quote. We want it to be clearly differentiated from normal text.
    </p>
  </blockquote>

  <h2>Code block</h2>
  <pre class="notion-code-block"><code class="hljs language-javascript">
const hello = (name) => {
  console.log('Hello, ' + name + '!')
}
  </code></pre>

  <h2>Table</h2>
  <table>
    <thead>
      <tr>
        <th>Thing</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>React</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Next.js</td>
        <td>14</td>
      </tr>
    </tbody>
  </table>

  <h2>Image caption</h2>
  <figure class="notion-image">
    <img alt="Example" src="/sam.png" style="max-width: 240px; border-radius: 12px;" />
    <legend>Legend/caption text (Notion style)</legend>
  </figure>
`;

export default function BlogStyleGuide() {
  return (
    <>
      <Head>
        <title>Blog style guide | Sam Fitz</title>
        <meta
          name="description"
          content="Visual test page for Notion blog rendering styles."
        />
        <link rel="canonical" href="https://samdoes.dev/blog/style-guide" />
      </Head>

      <div className="grid grid-cols-[54px_1fr]">
        <SideBar />
        <main>
          <Header />
          <div className="md:mx-auto max-w-[360px] md:max-w-5xl px-4 md:px-8 pb-12 w-full">
            <div
              className="text-xl mt-10 mx-auto leading-10 prose max-w-none md:text-justify prose-p:text-white prose-headings:text-white prose-blockquote:text-white"
              dangerouslySetInnerHTML={{ __html: sampleHtml }}
            />
          </div>
        </main>
      </div>
    </>
  );
}
