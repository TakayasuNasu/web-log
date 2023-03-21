import { useEffect } from "react"
import type { FC } from "react"

// hooks
import { useTheme } from "~/utils/theme-provider"

const TwitterTimeline: FC = (): JSX.Element => {
  const [theme] = useTheme()

  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://platform.twitter.com/widgets.js"
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
