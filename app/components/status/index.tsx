import { renderToString } from "react-dom/server"
import type { FC } from "react"
import { Link } from "@remix-run/react"
import { useNavigate } from "@remix-run/react"
import { marked } from "marked"
import hljs from "highlight.js"

// type
import type { PostWithOgp, Ogp } from "~/models/open-graph.server"

// assets
import face from "~/images/face.png"

// styles
import styles from "./styles.css"
import highlightStyle from "highlight.js/styles/tokyo-night-dark.css"

export const links = () => [
  { rel: "stylesheet", href: highlightStyle },
  { rel: "stylesheet", href: styles },
]

const Status: FC<PostWithOgp> = ({
  sys: { publishedAt },
  slug,
  bodyCopy,
  reply,
  ogp,
}): JSX.Element => {
  const date = new Date(publishedAt)

  return (
    <div data-status data-has-reply={reply ? true : false}>
      <article>
        <Link to="/taka7beckham">
          <figure className="face">
            <img src={face} alt="face photo" />
          </figure>
        </Link>
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
                    timeZone: "America/Los_Angeles",
                  })}
                </p>
              </li>
            </ul>
          </header>
          <Body {...{ slug, bodyCopy, ogp }} />
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

const Body: FC<{ slug: string; bodyCopy: string; ogp?: Ogp }> = ({
  slug,
  bodyCopy,
  ogp,
}): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (to: string) => {
    navigate(`/taka7beckham/${to}`)
  }

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

  const renderer = new marked.Renderer()

  renderer.link = (href, title, text) => {
    if (!href || !text || !ogp) {
      return ``
    }
    if (title === null) {
      return renderToString(
        <a href={href} target="_blank">
          {text}
        </a>
      )
    }
    return renderToString(<OgpComponent {...ogp} />)
  }

  marked.use({ renderer })

  const html = marked(bodyCopy)

  return (
    <main
      data-status-body
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={() => handleClick(slug)}
    />
  )
}

const OgpComponent: FC<Ogp> = ({
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}): JSX.Element => {
  if (!ogUrl || !ogImage) {
    return <div style={{ display: "none" }}></div>
  }

  const domain = ogUrl.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)

  return (
    <div data-ogp-link onClick={(e) => e.stopPropagation()}>
      <a href={ogUrl} target="_blank">
        {ogImage && (
          <figure className="og-image">
            <img src={ogImage?.url} alt="test" />
          </figure>
        )}

        <div className="og-text">
          <aside>
            <span>{domain && domain.length > 0 && domain[1]}</span>
          </aside>
          <h2>{ogTitle}</h2>
          <p>{ogDescription}</p>
        </div>
      </a>
    </div>
  )
}
