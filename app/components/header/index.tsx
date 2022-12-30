import type { FC } from "react"
import { HiOutlineArrowLeft } from "react-icons/hi"

// context
import { useAppContext } from "~/context/store"

// assets
import face from "~/images/face.png"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

const Header: FC = (): JSX.Element => {
  const { toggle } = useAppContext()

  return (
    <header data-header>
      <ul className="mobile">
        <li className="face" onClick={toggle}>
          <img src={face} alt="face" />
        </li>
      </ul>
      <ul className="desktop">
        <li>
          <HiOutlineArrowLeft />
        </li>
        <li></li>
      </ul>
    </header>
  )
}

export default Header
