import type { FC } from "react"
import cx from "classnames"

// type
import type { Post } from "~/models/post.server"

// style
import * as styles from "./styles.css"

// components
import Body from "./body"
import Footer from "./footer"
import Header from "./header"
import SidebarLeft from "./sidebarLeft"

const Timeline: FC<Post> = ({
  slug,
  publishedDate,
  bodyCopy,
  reply,
}): JSX.Element => {
  const date = new Date(publishedDate)

  return (
    <article
      data-has-reply={reply ? true : false}
      className={cx(styles.wrapper, "flex items-start overflow-hidden")}
    >
      <SidebarLeft />

      <div className="main w-full">
        <Header date={date} />

        <Body {...{ slug, bodyCopy }} />

        <Footer slug={slug} />
      </div>
    </article>
  )
}

export default Timeline
