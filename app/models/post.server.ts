import { apiCall } from "./contentful.server"

export type Hashtag = {
  name: string
  slug: string
  iconType: string
}

export type Post = {
  sys: {
    publishedAt: string
  }
  name: string
  slug: string
  excerpt: string
  featured: boolean
  publishedDate: string
  bodyCopy: string
  heroImage?: {
    title: string
    description: string
    url: string
    width: string
    height: string
  }
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

const reply = `
reply {
  sys {
    publishedAt
  }
  slug
  publishedDate
  bodyCopy
  reply {
    sys {
      publishedAt
    }
    slug
    publishedDate
    bodyCopy
    reply {
      sys {
        publishedAt
      }
      slug
      publishedDate
      bodyCopy
    }
  }
}
`

export async function getPosts(
  slug?: string | null,
  limit: number | null = null,
) {
  const query = `
  {
    postCollection(order: [featured_DESC, publishedDate_DESC], limit: ${limit}) {
      items {
        sys {
          publishedAt
        }
        name
        slug
        excerpt
        featured
        publishedDate
        bodyCopy
        heroImage {
          title
          description
          url
          width
          height
        }
        collection: hashtagsCollection {
          hashtags: items {
            name
            slug
            iconType
          }
        }
        ${reply}
      }
    }
  }
  `

  const response = await apiCall(query)

  const { data, errors } = (await response.json()) as PostsResponse

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown",
    )
    return Promise.reject(error)
  }

  const replies = data.postCollection.items
    .map((post) => {
      return post.reply?.slug
    })
    .filter((slug) => slug)

  const posts = data.postCollection.items.filter((post) => {
    return !replies.includes(post.slug)
  })

  if (slug) {
    return posts.filter((post) => {
      return post.collection.hashtags.some((tag) => tag.slug == slug)
    })
  }

  return posts
}

export async function getSinglePost(slug: string) {
  const query = `
    {
      postCollection(where: { slug: "${slug}"}) {
        items {
          sys {
            publishedAt
          }
          name
          slug
          excerpt
          featured
          publishedDate
          bodyCopy
          heroImage {
            title
            description
            url
            width
            height
          }
          collection: hashtagsCollection {
            hashtags: items {
              name
              slug
              iconType
            }
          }
          ${reply}
        }
      }
    }
  `

  const response = await apiCall(query)

  const { data, errors } = (await response.json()) as PostsResponse

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown",
    )
    return Promise.reject(error)
  }

  return data.postCollection.items.at(0)
}
