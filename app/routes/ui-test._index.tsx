import { useState } from "react"
import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { client } from "~/models/contentful.server"

// type
import type { Post } from "~/models/post.server"

// models
import { getPosts } from "~/models/post.server"

// components
import { links as statusLinks } from "~/components/status"
import Pagination, { links as paginationLinks } from "~/components/pagination"
import Timeline from "~/components/timeline"

export function links() {
  return [...statusLinks(), ...paginationLinks()]
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const tag = url.searchParams.get("tag")

  return json({
    masta: await client.getSiteMasta(),
    posts: await getPosts(),
  })
}

export default function Index() {
  const {
    masta: { perPage },
    posts,
  } = useLoaderData<typeof loader>()

  const [current, setCurrent] = useState(1)
  const offset = (current - 1) * perPage

  return (
    <>
      <ul className="statuses" data-statuses>
        {posts?.slice(offset, offset + perPage).map((post: Post, i) => {
          return (
            <li key={i}>
              <Timeline {...post} />
            </li>
          )
        })}
      </ul>
      <Pagination {...{ total: posts.length, perPage, current, setCurrent }} />
    </>
  )
}
