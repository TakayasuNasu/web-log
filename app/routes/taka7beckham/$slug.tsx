import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// models
import { client } from "~/models/contentful.server"

// type
import type { Post } from "~/models/contentful.server"

// components
import Status, { links as statusLinks } from "~/components/status"

export function links() {
  return [...statusLinks()]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await (
    await client.getPosts()
  ).find((post) => post.slug == params.slug)

  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ post: post })
}

export default function PostSlug() {
  const { post } = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Post: {post?.slug}
      </h1>
    </main>
  )
}
