import type { FC } from "react"
import { marked } from "marked"
import hljs from "highlight.js"

// assets
import face from "~/images/face.png"

// styles
import styles from "./styles.css"
import highlightStyle from "highlight.js/styles/tokyo-night-dark.css"

export const links = () => [
  { rel: "stylesheet", href: highlightStyle },
  { rel: "stylesheet", href: styles },
]

const Status: FC = (): JSX.Element => {
  return (
    <div data-status>
      <article>
        <figure>
          <img src={face} alt="face photo" />
        </figure>
        <Body />
      </article>
    </div>
  )
}

export default Status

const Body: FC = (): JSX.Element => {
  const markdown = `
  React + marked + highlight.js

  Each nested route's links are merged (parents first) and rendered as <link> tags by the <Links/> you rendered in app/root.js in the head of the document.

  **Code Sample:**
  \`\`\`javascript
  import marked from "marked";

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function(code) {
      return require("highlight.js").highlightAuto(code, ["html", "javascript"])
        .value;
    }
  });
  \`\`\`
  `

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, ["html", "javascript"]).value
    },
  })

  const html = marked(markdown)

  return (
    <div data-status-body>
      <header>
        <ul>
          <li className="name">
            <p>Tak</p>
          </li>
          <li className="email">
            <p>taka.beckham@gmail.com</p>
          </li>
          <li className="date">
            <p>December 28, 2022</p>
          </li>
        </ul>
      </header>
      <main dangerouslySetInnerHTML={{ __html: html }} />
      <footer>
        <ul>
          <li></li>
        </ul>
      </footer>
    </div>
  )
}
