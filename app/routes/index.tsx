import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { client } from "~/models/contentful.server"
import { getPostWithOgpData } from "~/models/open-graph.server"

// type
import type { Post } from "~/models/contentful.server"

// components
import Header, { links as headerLinks } from "~/components/header"
import Nav, { MobileNav, links as navLinks } from "~/components/nav"
import Sidebar, { links as sidebarLinks } from "~/components/sidebar"
import Status, { links as statusLinks } from "~/components/status"

// style
import styles from "~/styles/style.css"

export function links() {
  return [
    ...headerLinks(),
    ...navLinks(),
    ...sidebarLinks(),
    ...statusLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const tag = url.searchParams.get("tag")
  console.log({ tag })
  const siteMasta = await client.getSiteMasta()
  console.log(siteMasta)
  const {
    collection: { hashtags },
  } = await client.getHashtagBy()

  const posts = await client.getPosts(tag)

  return json({
    hashtags: hashtags,
    posts: await getPostWithOgpData(posts),
  })
}

export default function Index() {
  const { hashtags, posts } = useLoaderData<typeof loader>()

  return (
    <>
      <div data-container>
        <Nav {...{ hashtags }} />

        <main>
          <Header />

          <ul className="statuses">
            {posts?.map((post: Post, i) => {
              return (
                <li key={i}>
                  <Status {...post} />
                </li>
              )
            })}
          </ul>
        </main>

        <Sidebar />
      </div>
      <MobileNav {...{ hashtags }} />
    </>
  )
}
