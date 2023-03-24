import type { LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// models
import { client } from "~/models/contentful.server"
import { getPostWithOgpData } from "~/models/open-graph.server"

// types
import { Post } from "~/models/contentful.server"

// functions
import { getFromCache, hasCache } from "~/cache"

// components
import { links as statusLinks } from "~/components/status"
import { Body, SingleBody } from "~/components/status"

// assets
import face from "~/images/face.png"
import ogImage from "~/images/ogp-vancouver.jpg"

export function links() {
  return [...statusLinks()]
}

export const loader = async ({ params }: LoaderArgs) => {
  const posts = hasCache("posts")
    ? (getFromCache("posts") as Post[])
    : await client.getPosts()

  const post = (await getPostWithOgpData(posts)).find(
    (post) => post.slug == params.slug
  )

  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ post: post })
}

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
  const {
    post: { name, excerpt },
  } = data

  const url = `https://weblog.i-nasu.com${location.pathname}`
  const image = `https://weblog.i-nasu.com${ogImage}`

  return {
    title: `${name} | weblog.i-nasu.com`,
    description: excerpt,
    "og:url": url,
    "og:title": `${name} | weblog.i-nasu.com`,
    "og:description": excerpt,
    "og:site_name": "weblog.i-nasu.com",
    "og:image": image,
    "twitter:card": "summary_large_image",
    "twitter:creator": "@taka7beckham",
    "twitter:site": "@taka7beckham",
  }
}

export default function PostSlug() {
  const {
    post: { bodyCopy, ogp, reply },
  } = useLoaderData<typeof loader>()
  return (
    <article data-single data-has-reply={reply ? true : false}>
      <header></header>
      <SingleBody {...{ bodyCopy, ogp }} />
      {reply && (
        <div className="reply-article">
          <figure className="face">
            <img src={face} alt="face photo" />
          </figure>
          <ul className="wrapper">
            <li className="header">
              <header>
                <ul>
                  <li className="name">
                    <p>Tak</p>
                  </li>
                  <li className="email">
                    <p>taka.beckham@gmail.com</p>
                  </li>
                  <li className="date">
                    {(() => {
                      const date = new Date(reply.sys.publishedAt)
                      return date.toLocaleString("en-us", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        timeZone: "America/Los_Angeles",
                      })
                    })()}
                  </li>
                </ul>
              </header>
            </li>
            <li>
              <Body {...{ bodyCopy: reply.bodyCopy, slug: reply.slug }} />
            </li>
          </ul>
        </div>
      )}
    </article>
  )
}
