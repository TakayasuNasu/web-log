import ogp from "open-graph-scraper"

export async function getOgpData(url: string) {
  const data = await ogp({ url: url, onlyGetOpenGraphInfo: true })

  if (data.error) {
    throw data.error
  }

  return data.result

  // return await ogp({ url: url, onlyGetOpenGraphInfo: true })
  //   .then((data) => {
  //     if (!data.result.success) {
  //       return
  //     }
  //     return data.result
  //   })
  //   .catch((error) => {
  //     throw error
  //   })
}
