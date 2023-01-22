import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { client } from "~/models/contentful.server"
import { getPostWithOgpData } from "~/models/open-graph.server"

// type
import type { Post } from "~/models/contentful.server"

// components
import Status, { links as statusLinks } from "~/components/status"

export function links() {
  return [...statusLinks()]
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const tag = url.searchParams.get("tag")
  const posts = await client.getPosts(tag)

  return json({
    posts: await getPostWithOgpData(posts),
  })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <ul className="statuses" data-statuses>
        {posts?.map((post: Post, i) => {
          return (
            <li key={i}>
              <Status {...post} />
              {post.reply && <Status {...post.reply} />}
            </li>
          )
        })}
      </ul>
    </>
  )
}
