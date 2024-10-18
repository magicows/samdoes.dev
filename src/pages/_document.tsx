import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>        
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sam Fitzpatrick - Software (React, React Native, Wordpress) Developer in Royal Leamington Spa, United Kingdom." />
        <meta name="keywords" content="portfolio, web developer, projects, sam fitzpatrick, wordpress, react, react native, javascript, typescript, nextjs, node, express, docker, aws, serverless, firebase, netlify, heroku, azure, html, css, redux, nodeJS, expressJS, docker, xcode, git, github, azure devops, figma, jira" />
        <meta property="og:title" content="Sam Fitzpatrick | Software Dev" />
        <meta property="og:description" content="React, React Native, and Wordpress developer based in Leamington Spa, UK." />
        <meta property="og:image" content="https://samdoes.dev/thumbnail.jpg" />
        <meta property="og:url" content="https://samdoes.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sam Fitzpatrick | Software Dev" />
        <meta name="twitter:description" content="React, React Native, and Wordpress developer based in Leamington Spa, UK." />
        <meta name="twitter:image" content="https://samdoes.dev/thumbnail.jpg" />
      </Head>
      <body id="root" className="bg-zinc-900 text-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
