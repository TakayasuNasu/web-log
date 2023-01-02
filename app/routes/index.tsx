import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Theme, useTheme } from "~/utils/theme-provider"
import { client } from "~/models/contentful.server"
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

export async function loader() {
  const siteMasta = await client.getSiteMasta()
  console.log(siteMasta)
  const {
    collection: { hashtags },
  } = await client.getHashtagBy()

  return json({
    hashtags: hashtags,
    posts: await client.getPosts(),
  })
}

export default function Index() {
  const [, setTheme] = useTheme()
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    )
  }

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

          <ul>
            <li>
              <button onClick={toggleTheme}>Toggle</button>
            </li>
          </ul>
        </main>

        <Sidebar />
      </div>
      <MobileNav />
    </>
  )
}
