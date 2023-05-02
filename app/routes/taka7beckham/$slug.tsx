import type { LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"

// models
import { client } from "~/models/contentful.server"

// components
import { links as statusLinks } from "~/components/status"
import { StatusHeader, StatusFooter, Body, SingleBody } from "~/components/status"

// assets
import ogImage from "~/images/ogp-vancouver.jpg"
import face from "~/images/face.webp"

export function links() {
  return [...statusLinks()]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = (await client.getPosts()).find(
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
    post: {
      sys: { publishedAt },
      slug,
      bodyCopy,
      reply,
    },
  } = useLoaderData<typeof loader>()
  const date = new Date(publishedAt)

  return (
    <article
      data-single
      data-has-reply={reply ? true : false}>

      <ul className="flex items-start gap-x-3">
        <li>
          <Link to="/taka7beckham">
            <figure className="face">
              <img src={face} alt="face photo" />
            </figure>
          </Link>
        </li>

        <li>
          <StatusHeader date={date} />

          <SingleBody {...{ bodyCopy }} />

          <StatusFooter slug={slug} />
        </li>
      </ul>

      {reply &&
        (() => {
          const date = new Date(reply.sys.publishedAt)
          return (
            <div className="reply-article">
              <figure className="face">
                <img src={face} alt="face photo" />
              </figure>

              <ul className="wrapper">
                <li>
                  <StatusHeader date={date} />
                </li>

                <li>
                  <Body {...{ bodyCopy: reply.bodyCopy, slug: reply.slug }} />
                </li>

                <li>
                  <StatusFooter slug={reply.slug} />
                </li>
              </ul>
            </div>
          )
        })()}
    </article>
  )
}
