import type { FC } from "react"
import { AiOutlineHome, AiOutlineLaptop } from "react-icons/ai"
import { CgDisc } from "react-icons/cg"
import { GrGatsbyjs } from "react-icons/gr"
import { GiSoccerBall } from "react-icons/gi"
import { FaReact } from "react-icons/fa"
import { MdOutlineMapsHomeWork } from "react-icons/md"
import { SiTypescript } from "react-icons/si"
import { RiEnglishInput } from "react-icons/ri"
import type { Hashtag } from "~/models/contentful.server"

// context
import { useAppContext } from "~/context/store"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

type ComponentProps = {
  hashtags: Array<Hashtag>
}

function navIcon(tag: string) {
  switch (tag) {
    case "AiOutlineLaptop":
      return <AiOutlineLaptop />
    case "CgDisc":
      return <CgDisc />
    case "GrGatsbyjs":
      return <GrGatsbyjs />
    case "GiSoccerBall":
      return <GiSoccerBall />
    case "FaReact":
      return <FaReact />
    case "MdOutlineMapsHomeWork":
      return <MdOutlineMapsHomeWork />
    case "SiTypescript":
      return <SiTypescript />
    case "RiEnglishInput":
      return <RiEnglishInput />
    default:
      break
  }
}

const Nav: FC<ComponentProps> = ({ hashtags }): JSX.Element => {
  return (
    <>
      <MainNav {...{ hashtags }} />
    </>
  )
}

export default Nav

const MainNav: FC<ComponentProps> = ({ hashtags }): JSX.Element => {
  return (
    <nav data-main-nav>
      <ul className="nav-list">
        <li className="home">
          <div className="icon">
            <AiOutlineHome />
          </div>
          <div className="text">Home</div>
        </li>
        {hashtags.map((tag, i) => {
          console.log(tag.iconType)
          return (
            <li key={i}>
              <div className="icon">{navIcon(tag.iconType)}</div>
              <div className="text">{tag.name}</div>
            </li>
          )
        })}
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
