import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node"
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

export const meta: V2_MetaFunction<typeof loader> = ({ location, data }) => {
  const url = `https://weblog.i-nasu.com${location.pathname}`
  const image = `https://weblog.i-nasu.com${ogImage}`

  return [
    { title: `${data?.post.name} | weblog.i-nasu.com`, },
    { name: "description", content: data?.post.excerpt },
    { property: "og:url", content: url },
    { property: "og:title", content: `${data?.post.name} | weblog.i-nasu.com` },
    { property: "og:description", content: data?.post.excerpt },
    { property: "og:site_name", content: "weblog.i-nasu.com" },
    { property: "og:image", content: image },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:creator", content: "@taka7beckham" },
    { property: "twitter:site", content: "@taka7beckham" },
  ]
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

      <ul className="main-timeline flex items-start gap-x-3">
        <li>
          <Link to="/taka7beckham">
            <figure className="face">
              <img src={face} alt="face photo" width={46} height={46} />
            </figure>
          </Link>
        </li>

        <li className="w-full min-w-0">
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
