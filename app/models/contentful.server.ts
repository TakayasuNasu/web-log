const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT

async function apiCall(query: string) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }

  return await fetch(fetchUrl, options)
}

export type MastaData = {
  domain: string
  email: string
  address: string
  introduction: string
  country: string
  nationality: string
  nickname: string
  description: string
}

export type Masta = {
  key: string
  value: string
}

export type SiteMasta = {
  data?: {
    siteMastaCollection: {
      items: Array<{
        name: string
        data: Array<Masta>
      }>
    }
  }
  errors?: Array<{ message: string }>
}

async function getSiteMasta() {
  const query = `
  {
    siteMastaCollection {
      items {
        name
        data
      }
    }
  }
  `

  const response = await apiCall(query)

  const { data, errors } = (await response.json()) as SiteMasta

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    )
    return Promise.reject(error)
  }

  if (data && data.siteMastaCollection.items.length < 1) {
    throw new Error("SiteMasta is not found.")
  }

  const masta = {} as Partial<MastaData>

  data?.siteMastaCollection.items[0].data.forEach((data) => {
    if (data.key == "domain") masta.domain = data.value
    if (data.key == "email") masta.email = data.value
    if (data.key == "address") masta.address = data.value
    if (data.key == "introduction") masta.introduction = data.value
    if (data.key == "country") masta.country = data.value
    if (data.key == "nationality") masta.nationality = data.value
    if (data.key == "nickname") masta.nickname = data.value
    if (data.key == "description") masta.description = data.value
  })

  return masta as MastaData
}

export type Hashtag = {
  name: string
  slug: string
  iconType: string
}

type CollectionHashtagResponse = {
  data?: {
    list: {
      items: Array<{
        name: string
        slug: string
        collection: {
          hashtags: Array<Hashtag>
        }
      }>
    }
  }
  errors?: Array<{ message: string }>
}

async function getHashtagBy(slug: string = "left-nav") {
  const query = `
  {
    list: collectionHashtagCollection {
      items {
        name
        slug
        collection: hashtagsCollection {
          hashtags: items {
            name
            slug
            iconType
          }
        }
      }
    }
  }
  `

  const response = await apiCall(query)

  const { data, errors } = (await response.json()) as CollectionHashtagResponse

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    )
    return Promise.reject(error)
  }

  return (
    (await data?.list.items.find((data) => data.slug == slug)) || {
      collection: { hashtags: Array<undefined> },
    }
  )
}

export type Post = {
  sys: {
    publishedAt: string
  }
  name: string
  slug: string
  excerpt: string
  bodyCopy: string
  collection: {
    hashtags: Array<Hashtag>
  }
  reply?: Post
}

type PostsResponse = {
  data: {
    postCollection: {
      items: Array<Post>
    }
  }
  errors?: Array<{ message: string }>
}

export async function getPosts(slug?: string | null) {
  const query = `
  {
    postCollection {
      items {
        sys {
          publishedAt
        }
        name
        slug
        excerpt
        bodyCopy
        collection: hashtagsCollection {
          hashtags: items {
            name
            slug
            iconType
          }
        }
        reply {
          sys {
            publishedAt
          }
          slug
          bodyCopy
        }
      }
    }
  }
  `

  const response = await apiCall(query)

  const { data, errors } = (await response.json()) as PostsResponse

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    )
    return Promise.reject(error)
  }

  if (slug) {
    return data?.postCollection.items.filter((post) => {
      return post.collection.hashtags.some((tag) => tag.slug == slug)
    })
  }

  return data?.postCollection.items
}

export const client = { getSiteMasta, getHashtagBy, getPosts }
