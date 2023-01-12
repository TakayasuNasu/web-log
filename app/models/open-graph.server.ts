import ogp from "open-graph-scraper"
import {
  successResultObject,
  errorResultObject,
  imageObject,
} from "open-graph-scraper"
import type { Post } from "./contentful.server"

export type Ogp = {
  ogTitle?: string
  ogType?: string
  ogUrl?: string
  ogDescription?: string
  ogImage?: imageObject
}

export type PostWithOgp = Post & { ogp?: Ogp }

export async function getOgpData(url: string) {
  const data = await ogp({ url: url, onlyGetOpenGraphInfo: true })

  if (data.error) {
    throw data.error
  }

  return data.result
}

export async function getPostWithOgpData(posts: Array<Post>) {
  const postWithOgp: Array<PostWithOgp> = []

  await Promise.all(
    posts.map(async (post) => {
      const url = pickUrlFromMd(post)
      if (!url) {
        postWithOgp.push(post)
        return
      }
      const data = await getOgpData(url)
      const { ogTitle, ogDescription, ogUrl, ogImage } = data
      if (
        typeof ogImage === "object" &&
        !Array.isArray(ogImage) &&
        ogImage != null
      ) {
        postWithOgp.push({
          ...post,
          ogp: { ogTitle, ogDescription, ogUrl, ogImage },
        })
      }
    })
  )
  return postWithOgp
}

function pickUrlFromMd(post: Post) {
  const regExp = /(?<!\()https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+/g
  const result = post.bodyCopy.match(regExp)
  if (Array.isArray(result)) return result[0]
  return undefined
}
