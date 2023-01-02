import type { FC } from "react"
import { marked } from "marked"
import hljs from "highlight.js"
import type { Post } from "~/models/contentful.server"

// assets
import face from "~/images/face.png"

// styles
import styles from "./styles.css"
import highlightStyle from "highlight.js/styles/tokyo-night-dark.css"

export const links = () => [
  { rel: "stylesheet", href: highlightStyle },
  { rel: "stylesheet", href: styles },
]

const Status: FC<Post> = ({
  sys: { publishedAt },
  name,
  excerpt,
  bodyCopy,
  collection,
}): JSX.Element => {
  const date = new Date(publishedAt)
  return (
    <div data-status>
      <article>
        <figure>
          <img src={face} alt="face photo" />
        </figure>
        <div className="body">
          <header>
            <ul>
              <li className="name">
                <p>Tak</p>
              </li>
              <li className="email">
                <p>taka.beckham@gmail.com</p>
              </li>
              <li className="date">
                <p>
                  {date.toLocaleString("en-us", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </li>
            </ul>
          </header>
          <Body {...{ bodyCopy }} />
          <footer>
            <ul>
              <li></li>
            </ul>
          </footer>
        </div>
      </article>
    </div>
  )
}

export default Status

const Body: FC<{ bodyCopy: string }> = ({ bodyCopy }): JSX.Element => {
  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, [
        "html",
        "javascript",
        "typescript",
        "bash",
      ]).value
    },
  })

  const html = marked(bodyCopy)

  return <main data-status-body dangerouslySetInnerHTML={{ __html: html }} />
}
