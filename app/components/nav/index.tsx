import type { FC } from "react"
import { AiOutlineHome } from "react-icons/ai"

// context
import { useAppContext } from "~/context/store"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

const Nav: FC = (): JSX.Element => {
  return (
    <>
      <MainNav />
    </>
  )
}

export default Nav

const MainNav: FC = (): JSX.Element => {
  return (
    <nav data-main-nav>
      <ul>
        <li>
          <a href="/" className="text-link">
            <div className="icon">
              <AiOutlineHome />
            </div>
            <div className="text">Home</div>
          </a>
        </li>
        <li>
          <a href="/" className="text-link">
            <div className="icon">
              <AiOutlineHome />
            </div>
            <div className="text">Search</div>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export const MobileNav: FC = (): JSX.Element => {
  const {
    state: { expanded },
    close,
  } = useAppContext()

  return (
    <>
      <div
        className="layer"
        data-mobile-nav-layer
        data-active={expanded}
        onClick={close}
      ></div>

      <nav data-mobile-nav data-active={expanded}>
        <ul>
          <li></li>
        </ul>
      </nav>
    </>
  )
}
