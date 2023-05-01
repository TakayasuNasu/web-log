import { useEffect } from "react"
import type { FC } from "react"

// hooks
import { useTheme } from "~/utils/theme-provider"

const TwitterTimeline: FC = (): JSX.Element => {
  const [theme] = useTheme()

  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/partytown"
    script.src = "https://platform.twitter.com/widgets.js"
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const tweet = document.getElementById("twitter-widget-0")
    if (tweet) {
      const src = tweet.getAttribute("src")!
      const currentTheme = theme == "dark" ? "light" : "dark"
      tweet.setAttribute(
        "src",
        src.replace("theme=" + currentTheme, "theme=" + theme)
      )
    }
  }, [theme])

  return (
    <a
      className="twitter-timeline"
      href="https://twitter.com/taka7beckham?ref_src=twsrc%5Etfw"
      data-chrome="noheader nofooter noborders noscrollbar transparent"
      data-tweet-limit="6"
      data-theme={theme == "light" ? "light" : "dark"}
    ></a>
  )
}

export default TwitterTimeline
