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

// context provider
import { ThemeProvider, useTheme, ThemeHead } from "~/utils/theme-provider"
import { AppContextProvider } from "~/context/store"

import { getThemeSession } from "~/utils/theme.server"

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request)

  return json({
    theme: themeSession.getTheme(),
  })
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Web Log i-nasu.com by Tak",
  viewport: "width=device-width,initial-scale=1",
})

function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={theme ?? ""}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Outlet />
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
