import type { FC } from "react"

import cx from "classnames"

// style
import * as styles from "./styles.css"

const Header: FC<{ date: Date }> = ({ date }): JSX.Element => {
  return (
    <header>
      <ul className={cx(styles.header, "grid gap-x-3")}>
        <li className="name font-bold">
          <p>Tack</p>
        </li>

        <li className="email">
          <p className={cx(styles.sonicSilver)}>taka.beckham@gmail.com</p>
        </li>

        <li className="date">
          <p className={cx(styles.sonicSilver)}>
            {date.toLocaleString("en-us", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "America/Los_Angeles",
            })}
          </p>
        </li>
      </ul>
    </header>
  )
}

export default Header
