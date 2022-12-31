import { json } from "@remix-run/node"
import { Theme, useTheme } from "~/utils/theme-provider"
import { client } from "~/models/contentful.server"

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
  return json({
    posts: [
      {
        slug: "my-first-post",
        title: "My First Post",
      },
      {
        slug: "90s-mixtape",
        title: "A Mixtape I Made Just For You",
      },
    ],
  })
}

export default function Index() {
  const [, setTheme] = useTheme()
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    )
  }

  return (
    <>
      <div data-container>
        <Nav />
        <main>
          <Header />
          <ul className="statuses">
            <li>
              <Status />
            </li>
            <li>
              <Status />
            </li>
            <li>
              <Status />
            </li>
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
