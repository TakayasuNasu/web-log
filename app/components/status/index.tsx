import type { FC } from "react"
import { Link } from "@remix-run/react"
import { useNavigate } from "@remix-run/react"
import { ClientOnly } from "remix-utils"

// type
import type { Post } from "~/models/contentful.server"
import type { Ogp } from "~/models/open-graph.server"

// assets
import face from "~/images/face.webp"

// icons
import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"

// styles
import styles from "./styles.css"
import prismStyle from "./prism.css"
import contentStyle from "./content.css"
import embedStyle from "./embed.css"

export const links = () => [
  { rel: "stylesheet", href: prismStyle },
  { rel: "stylesheet", href: embedStyle },
  { rel: "stylesheet", href: contentStyle },
  { rel: "stylesheet", href: styles },
]

const Status: FC<Post> = ({
  slug,
  publishedDate,
  bodyCopy,
  reply,
}): JSX.Element => {
  const date = new Date(publishedDate)

  return (
    <div data-status data-has-reply={reply ? true : false}>
      <article>
        <Link to="/taka7beckham">
          <figure className="face">
            <img src={face} alt="face photo" />
          </figure>
        </Link>

        <div className="body">
          <StatusHeader date={date} />

          <Body {...{ slug, bodyCopy }} />

          <StatusFooter slug={slug} />

        </div>
      </article>
    </div>
  )
}

export default Status

export const StatusHeader: FC<{ date: Date }> = ({ date }): JSX.Element => {
  return (
    <header>
      <ul className="grid gap-x-3">
        <li className="name">
          <p>Tack</p>
        </li>

        <li className="email">
          <p>taka.beckham@gmail.com</p>
        </li>

        <li className="date">
          <p>
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

export const StatusFooter: FC<{slug: string}> = ({ slug }): JSX.Element => {

  const url = `https://weblog.i-nasu.com/taka7beckham/${slug}`
  
  return (
    <footer data-status-footer>
      <ul className="grid grid-cols-2 mr-auto w-1/5">
        <li>
          <a href={`http://www.facebook.com/share.php?u=${url}`} rel="noreferrer noopener" target="_blank">
            <BsFacebook />
          </a>
        </li>

        <li>
          <a href={`https://twitter.com/share?url=${url}`} rel="noreferrer noopener" target="_blank">
            <BsTwitter />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export const Body: FC<{ slug: string; bodyCopy: string }> = ({
  slug,
  bodyCopy,
}): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    to: string
  ) => {
    if ("localName" in e.target && e.target.localName != "img") {
      navigate(`/taka7beckham/${to}`)
    }
  }

  return (
    <ClientOnly fallback={null}>
      {() => (
        <main
          data-status-body
          dangerouslySetInnerHTML={{ __html: bodyCopy }}
          onClick={(e) => handleClick(e, slug)}
        />
      )}
    </ClientOnly>
  )
}

export const SingleBody: FC<{ bodyCopy: string }> = ({
  bodyCopy,
}): JSX.Element => {
  return (
    <ClientOnly fallback={null}>
      {() => (
        <main
          data-status-body
          data-single-body
          dangerouslySetInnerHTML={{ __html: bodyCopy }}
        />
      )}
    </ClientOnly>
  )
}

const OgpComponent: FC<Ogp> = ({
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}): JSX.Element => {
  if (!ogUrl || !ogImage) {
    return <div style={{ display: "none" }}></div>
  }

  const domain = ogUrl.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)

  return (
    <div data-ogp-link>
      <a href={ogUrl} target="_blank">
        {ogImage && (
          <figure className="og-image">
            <img src={ogImage?.url} alt="test" />
          </figure>
        )}

        <div className="og-text">
          <aside>
            <span>{domain && domain.length > 0 && domain[1]}</span>
          </aside>
          <h2>{ogTitle}</h2>
          <p>{ogDescription}</p>
        </div>
      </a>
    </div>
  )
}
