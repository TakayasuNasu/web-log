import type { FC } from "react"

// components
import TwitterTimeline from "../twitterTimeline"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

const Sidebar: FC = (): JSX.Element => {
  return (
    <section data-sidebar>
      <header>
        <h2>Recent Tweet</h2>
      </header>

      <ul className="timeline">
        <li>
          <TwitterTimeline />
        </li>
      </ul>
    </section>
  )
}

export default Sidebar
