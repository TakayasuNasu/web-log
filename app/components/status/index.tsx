import { useFetcher } from "@remix-run/react"
import { useState, useEffect } from "react"
import { renderToString } from "react-dom/server"
import type { FC } from "react"
import { marked } from "marked"
import hljs from "highlight.js"
import type { Post } from "~/models/contentful.server"
import { action as openGraphAction } from "~/routes/action/open-graph"
import {
  successResultObject,
  errorResultObject,
  imageObject,
} from "open-graph-scraper"

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
        <figure className="face">
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

export type OpenGrapData = {
  ogTitle?: string
  ogType?: string
  ogUrl?: string
  ogDescription?: string
  ogImage?: string | imageObject | imageObject[] | undefined
}

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
      const { ogTitle, ogDescription, ogUrl, ogImage } = result
      setOgpComponent(
        renderToString(
          <OgpComponent {...{ ogTitle, ogDescription, ogUrl, ogImage }} />
        )
      )
    }
  }, [fetcher.data])

  return <main data-status-body dangerouslySetInnerHTML={{ __html: html }} />
}

const OgpComponent: FC<OpenGrapData> = ({
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
    <div data-ogp-link>
      <a href={ogUrl} target="_blank">
        {typeof ogImage !== "string" && !Array.isArray(ogImage) && (
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
