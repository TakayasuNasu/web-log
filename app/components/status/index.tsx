import { useFetcher } from "@remix-run/react"
import { useState, useEffect } from "react"
import { renderToString } from "react-dom/server"
import type { FC } from "react"
import { marked } from "marked"
import hljs from "highlight.js"
import type { Post } from "~/models/contentful.server"
import { action as openGraphAction } from "~/routes/action/open-graph"
import { successResultObject, errorResultObject } from "open-graph-scraper"

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
                    timeZone: "America/Los_Angeles",
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
  const fetcher = useFetcher<typeof openGraphAction>()

  const [html, setHtml] = useState("")
  const [ogpUrl, setOgpUrl] = useState("")
  const [ogpComponent, setOgpComponent] = useState(
    "<p style='{display: none}'></p>"
  )

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
    if (!href || !text) {
      return ``
    }
    setOgpUrl(href)
    if (title === null) {
      return renderToString(
        <a href={href} target="_blank">
          {text}
        </a>
      )
    }
    return ogpComponent
  }

  marked.use({ renderer })

  useEffect(() => {
    setHtml(marked(bodyCopy))
  }, [ogpComponent])

  useEffect(() => {
    if (ogpUrl) {
      fetcher.submit(
        { url: ogpUrl },
        { action: "/action/open-graph", method: "post" }
      )
    }
  }, [ogpUrl])

  useEffect(() => {
    if (!fetcher.data) return
    const result: successResultObject | errorResultObject =
      fetcher.data.openGraphData
    if (result.success) {
      const { ogTitle, ogDescription } = result
      setOgpComponent(
        renderToString(
          <OgpComponent {...{ title: ogTitle, description: ogDescription }} />
        )
      )
    }
  }, [fetcher.data])

  return <main data-status-body dangerouslySetInnerHTML={{ __html: html }} />
}

const OgpComponent: FC<{ title?: string; description?: string }> = ({
  title,
  description,
}): JSX.Element => {
  return (
    <a href="" data-ogp>
      <figure></figure>
      <div>
        <p>{title}</p>
      </div>
    </a>
  )
}
