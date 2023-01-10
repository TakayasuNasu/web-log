import ogp from "open-graph-scraper"

export async function getOgpData(url: string) {
  const data = await ogp({ url: url, onlyGetOpenGraphInfo: true })

  if (data.error) {
    throw data.error
  }

  return data.result
}
