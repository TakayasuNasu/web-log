import { useEffect } from "react"
import type { FC } from "react"
import { useFetcher } from "@remix-run/react"
import { ClientOnly } from "remix-utils"

const CustomCard: FC<{ url?: string }> = ({ url }): JSX.Element => {
  if (!url) {
    return <></>
  }

  return <ClientOnly fallback={null}>{() => <Card url={url} />}</ClientOnly>
}

export default CustomCard

const Card: FC<{ url: string }> = ({ url }): JSX.Element => {
  const fetcher = useFetcher()
  useEffect(() => {
    const controller = new AbortController()

    const hoge = async () => {
      let html
      try {
        const res = await fetch(`/loader/ogp?url=${url}`, {
          signal: controller.signal,
        })

        html = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")
        console.log(doc)
        const metaElements = doc.querySelectorAll("meta")
        metaElements.forEach((meta) => {
          console.log({ meta })
        })
      } catch (error) {
        console.log(error)
      }
    }

    hoge()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section>
      <span>{url}</span>
    </section>
  )
}
