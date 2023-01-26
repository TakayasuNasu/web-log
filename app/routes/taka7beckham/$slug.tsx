import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// models
import { client } from "~/models/contentful.server"
import { getPostWithOgpData } from "~/models/open-graph.server"

// type
import type { Post } from "~/models/contentful.server"

// components
import { links as statusLinks } from "~/components/status"
import { SingleBody } from "~/components/status"

export function links() {
  return [...statusLinks()]
}

export const loader = async ({ params }: LoaderArgs) => {
  const posts = await client.getPosts()

  const post = (await getPostWithOgpData(posts)).find(
    (post) => post.slug == params.slug
  )

  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ post: post })
}

export default function PostSlug() {
  const {
    post: { bodyCopy, ogp, reply },
  } = useLoaderData<typeof loader>()
  return (
    <article data-single data-has-reply={reply ? true : false}>
      <header></header>
      <SingleBody {...{ bodyCopy, ogp }} />
    </article>
  )
}
