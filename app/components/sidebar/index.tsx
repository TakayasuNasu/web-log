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
        <li>take it easy.</li>
      </ul>
    </section>
  )
}

export default Sidebar
