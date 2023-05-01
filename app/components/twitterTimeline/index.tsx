import { useEffect } from "react"
import type { FC } from "react"
import { TwitterTimelineEmbed } from 'react-twitter-embed';

// hooks
import { useTheme } from "~/utils/theme-provider"

const TwitterTimeline: FC = (): JSX.Element => {
  const [theme] = useTheme()

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
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="taka7beckham"
      noHeader={true}
      noFooter={true}
      noBorders={true}
      noScrollbar={true}
      transparent={true}
      tweetLimit={8}
      theme={theme == "light" ? "light" : "dark"} />
  )
}

export default TwitterTimeline
