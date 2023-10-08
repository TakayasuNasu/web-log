import { useState, useEffect } from "react"
import type { FC } from "react"
import { useFetcher } from "@remix-run/react"
import { ClientOnly } from "remix-utils/client-only"
import cx from "classnames"

// style
import * as styles from "./styles.css"

const CustomCard: FC<{ url?: string }> = ({ url }): JSX.Element => {
  if (!url) {
    return <></>
  }

  return <ClientOnly fallback={null}>{() => <Card url={url} />}</ClientOnly>
}

export default CustomCard

const Card: FC<{ url: string }> = ({ url }): JSX.Element => {
  const [title, setTitle] = useState<string | undefined>("")
  const [description, setDescription] = useState<string | undefined>("")
  const [img, setImg] = useState<string | undefined>("")
  const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)

  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state == "idle" && fetcher.data) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(fetcher.data.data, "text/html")

      const title = doc.querySelector("title")
      setTitle(title?.innerHTML)

      const metaElements = doc.querySelectorAll("meta")

      metaElements.forEach((meta) => {
        if (meta.hasAttribute("property")) {
          const property = meta.getAttribute("property")
          const content = meta.getAttribute("content")
          if (property == "og:image" && content) {
            setImg(content)
          }

          if (property == "og:description" && content) {
            setDescription(content)
          }
        }
      })
    }
  }, [fetcher])

  useEffect(() => {
    const setup = async () => {
      try {
        fetcher.load(`/loader/ogp?url=${url}`)
      } catch (error) {
        console.log(error)
      }
    }

    setup()
  }, [])

  return (
    <div className={cx(styles.cardWrapper, "overflow-hidden relative")}>
      <a
        href={url}
        target="_blank"
        className={cx(styles.ogpCard, "no-underline")}
      >
        {img && (
          <figure className="og-image">
            <img src={img} alt="card image" />
          </figure>
        )}

        <div className={cx(styles.ogTextBlock, "p-3")}>
          <aside className={cx(styles.textGray)}>
            <span>{domain && domain.length > 0 && domain[1]}</span>
          </aside>

          <h2 className={cx(styles.textLg, "py-2")}>{title}</h2>
          <p className={cx(styles.textGray, "leading-tight")}>{description}</p>
        </div>
      </a>
    </div>
  )
}
