import type { LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"

// models
import { client } from "~/models/contentful.server"
import { getThemeSession } from "~/utils/theme.server"

// context provider
import { ThemeProvider, useTheme, ThemeHead } from "~/utils/theme-provider"
import { AppContextProvider } from "~/context/store"

// components
import Header, { links as headerLinks } from "~/components/header"
import Nav, { MobileNav, links as navLinks } from "~/components/nav"
import Sidebar, { links as sidebarLinks } from "~/components/sidebar"

// style
import styles from "~/styles/style.css"

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request)
  const {
    collection: { hashtags },
  } = await client.getHashtagBy()

  return json({
    hashtags: hashtags,
    theme: themeSession.getTheme(),
  })
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Web Log i-nasu.com by Tak",
  viewport: "width=device-width,initial-scale=1",
})

export function links() {
  return [
    ...headerLinks(),
    ...navLinks(),
    ...sidebarLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

function App() {
  const data = useLoaderData<typeof loader>()
  const { hashtags } = data
  const [theme] = useTheme()

  return (
    <html lang="en" className={theme ?? ""}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <div data-container>
          <Nav {...{ hashtags }} />

          <main>
            <Header />
            <Outlet />
          </main>
          <Sidebar />
        </div>
        <MobileNav {...{ hashtags }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  )
}
