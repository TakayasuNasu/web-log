import ogp from "open-graph-scraper"
import { ImageObject } from "open-graph-scraper/lib/types"
import type { Post } from "./contentful.server"
import { getFromCache, setToCache, hasCache } from "~/cache"

export type Ogp = {
  ogTitle?: string
  ogType?: string
  ogUrl?: string
  ogDescription?: string
  ogImage?: ImageObject
}

export type PostWithOgp = Post & { ogp?: Ogp }

export async function getOgpData(url: string) {
  if (hasCache("ogp")) {
    return getFromCache("ogp")
  }

  const data = await ogp({ url: url, onlyGetOpenGraphInfo: true })

  if (data.error) {
    throw data.error
  }

  setToCache("ogp", data.result)

  return data.result
}

export async function getPostWithOgpData(posts: Array<Post>) {
  const postWithOgp = await Promise.all(
    posts.map(async (post) => {
      const url = pickUrlFromMd(post)
      if (!url) {
        return post
      }
      const data = await getOgpData(url)
      const { ogTitle, ogDescription, ogUrl, ogImage } = data
      if (
        typeof ogImage === "object" &&
        !Array.isArray(ogImage) &&
        ogImage != null
      ) {
        return { ...post, ogp: { ogTitle, ogDescription, ogUrl, ogImage } }
      }
    })
  )

  return postWithOgp as Array<PostWithOgp>
}

function pickUrlFromMd(post: Post) {
  const regExp = /(?<!\()https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+/g
  const result = post.bodyCopy.match(regExp)
  if (Array.isArray(result)) return result[0]
  return undefined
}
