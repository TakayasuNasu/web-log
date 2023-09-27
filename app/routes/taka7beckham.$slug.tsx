import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import cx from "classnames"

// models
import { getSinglePost } from "~/models/post.server"

// components
import { links as statusLinks } from "~/components/status"
import Body from "~/components/timeline/body"
import Footer from "~/components/timeline/footer"
import Header from "~/components/timeline/header"
import SidebarLeft from "~/components/timeline/sidebarLeft"
import Reply from "~/components/timeline/reply"

// assets
import ogImage from "~/images/ogp-vancouver.jpg"

// style
import * as styles from "~/components/timeline/styles.css"

export function links() {
  return [...statusLinks()]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getSinglePost(params.slug || "")

  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }

  return json({ post: post })
}

export const meta: V2_MetaFunction<typeof loader> = ({ location, data }) => {
  const url = `https://weblog.i-nasu.com${location.pathname}`
  const image = `https://weblog.i-nasu.com${ogImage}`

  return [
    { title: `${data?.post.name} | weblog.i-nasu.com` },
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
  const { post } = useLoaderData<typeof loader>()

  const {
    sys: { publishedAt },
    slug,
    bodyCopy,
    reply,
  } = post

  const date = new Date(publishedAt)

  return (
    <>
      <article
        data-has-reply={reply ? true : false}
        className={cx(styles.wrapper, "flex items-start overflow-hidden")}
      >
        <SidebarLeft />

        <div className="main w-full">
          <Header date={date} />

          <Body {...{ slug, bodyCopy }} />

          <Footer slug={slug} />
        </div>
      </article>

      {post.reply && <Reply {...post} />}
    </>
  )
}
