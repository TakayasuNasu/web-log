import type { FC } from "react"
import { useNavigate } from "@remix-run/react"

// icons
import { AiOutlineHome, AiOutlineLaptop } from "react-icons/ai"
import { CgDisc } from "react-icons/cg"
import { GrGatsbyjs } from "react-icons/gr"
import { GiSoccerBall } from "react-icons/gi"
import { FaReact } from "react-icons/fa"
import { MdOutlineMapsHomeWork } from "react-icons/md"
import { SiTypescript } from "react-icons/si"
import { RiEnglishInput } from "react-icons/ri"

// types
import type { Hashtag } from "~/models/contentful.server"
import type { MastaData } from "~/models/contentful.server"

// context
import { useAppContext } from "~/context/store"

// components
import FancyButton, {
  links as fancyButtonStyle,
} from "~/components/reusable/buttonLink"

// style
import styles from "./styles.css"

export const links = () => [
  ...fancyButtonStyle(),
  { rel: "stylesheet", href: styles },
]

type ComponentProps = {
  hashtags: Array<Hashtag>
  masta?: Partial<MastaData>
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

const Nav: FC<ComponentProps> = ({ masta, hashtags }): JSX.Element => {
  return (
    <>
      <MainNav {...{ masta, hashtags }} />
    </>
  )
}

export default Nav

const MainNav: FC<ComponentProps> = ({ hashtags }): JSX.Element => {
  const navigate = useNavigate()
  return (
    <nav data-main-nav>
      <ul className="nav-list">
        <li className="home" onClick={() => navigate("/")}>
          <div className="icon">
            <AiOutlineHome />
          </div>
          <div className="text">
            <p>Home</p>
          </div>
        </li>

        {hashtags.map((tag, i) => {
          return (
            <li key={i} onClick={() => navigate(`/?tag=${tag.slug}`)}>
              <div className="icon">{navIcon(tag.iconType)}</div>
              <div className="text">
                <p>{tag.name}</p>
              </div>
            </li>
          )
        })}

        <li className="button">
          <FancyButton to="https://www.i-nasu.com/">i-nasu.com</FancyButton>
        </li>
      </ul>
    </nav>
  )
}

export const MobileNav: FC<ComponentProps> = ({
  masta,
  hashtags,
}): JSX.Element => {
  const navigate = useNavigate()

  const navigateAsClose = (to: string) => {
    navigate(to)
    close()
  }

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
        <header>
          <p>About</p>
        </header>

        <ul className="about">
          <li>
            <p>{masta?.nickname}</p>
          </li>
          <li>
            <p>{masta?.email}</p>
          </li>
        </ul>

        <ul className="nav-list">
          <li className="home" onClick={() => navigateAsClose("/")}>
            <div className="icon">
              <AiOutlineHome />
            </div>
            <div className="text">
              <p>Home</p>
            </div>
          </li>
          {hashtags.map((tag, i) => {
            return (
              <li key={i} onClick={() => navigateAsClose(`/?tag=${tag.slug}`)}>
                <div className="icon">{navIcon(tag.iconType)}</div>
                <div className="text">
                  <p>{tag.name}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
