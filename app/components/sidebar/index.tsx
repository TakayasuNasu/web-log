import React, { useEffect } from "react"
import type { FC } from "react"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

const Sidebar: FC = (): JSX.Element => {
  return (
    <section data-sidebar>
      <header>
        <h2>What's going on?</h2>
      </header>

      <ul>
        <li>
          <TwitterTimeline />
        </li>
      </ul>
    </section>
  )
}

export default Sidebar

const TwitterTimeline = () => {
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
      data-chrome="transparent noheader nofooter"
      data-tweet-limit="6"
    ></a>
  )
}
