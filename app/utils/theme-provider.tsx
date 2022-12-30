import { useFetcher } from "@remix-run/react"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const themes: Array<Theme> = Object.values(Theme)

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const prefersDarkMQ = "(prefers-color-scheme: dark)"

const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: ReactNode
  specifiedTheme: Theme | null
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme
      } else {
        null
      }
    }

    if (typeof document === "undefined") {
      return null
    }

    return getPreferredTheme()
  })

  const persistTheme = useFetcher()

  const persistThemeRef = useRef(persistTheme)

  useEffect(() => {
    persistThemeRef.current = persistTheme
  }, [persistTheme])

  const mountRun = useRef(false)

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true
      return
    }

    if (!theme) {
      return
    }

    persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    )
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ)
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light'
  
    const cl = document.documentElement.classList

    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark')

    if (themeAlreadyApplied) {
      console.warn("Hi there, could you let me know you're seeing this message? Thanks!")
    } else {
      cl.add(theme)
    }

    const meta = document.querySelector('meta[name=color-scheme]')

    if (meta) {
      if (theme === 'dark') {
        meta.content = 'dark light'
      } else if (theme === 'light') {
        meta.content = 'light dark'
      }
    } else {
      console.warn("Hey, could you let me know you're seeing this message? Thanks!")
    }
})()
`

function ThemeHead({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme()

  return (
    <>
      <meta
        name="color-scheme"
        content={theme === "light" ? "light dark" : "dark light"}
      />

      {ssrTheme ? null : (
        <>
          <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
        </>
      )}
    </>
  )
}

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme)
}

export { Theme, ThemeProvider, useTheme, isTheme, ThemeHead }
