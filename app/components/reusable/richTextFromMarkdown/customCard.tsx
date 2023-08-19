import { useEffect } from "react"
import type { FC } from "react"
import { ClientOnly } from "remix-utils"
import ogp from "open-graph-scraper"

const CustomCard: FC<{ url?: string }> = ({ url }): JSX.Element => {
  if (!url) {
    return <></>
  }

  return <ClientOnly fallback={null}>{() => <Card url={url} />}</ClientOnly>
}

export default CustomCard

// export async function getOgpData(url: string) {
//   const data = await ogp({ url: url, onlyGetOpenGraphInfo: true })

//   if (data.error) {
//     throw data.error
//   }

//   return data.result
// }

const Card: FC<{ url: string }> = ({ url }): JSX.Element => {
  useEffect(() => {
    console.log(12)
  }, [])

  return (
    <section>
      <span>{url}</span>
    </section>
  )
}
