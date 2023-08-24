import React from "react"
import type { FC } from "react"
import { Link } from "@remix-run/react"
import Markdown from "markdown-to-jsx"
import cx from "classnames"

// type
import type { Post } from "~/models/post.server"

// components
import CustomCard from "./customCard"

// assets
import face from "~/images/face.webp"

// style
import * as styles from "./styles.css"
import contentStyle from "~/components/status/content.css"

export const links = () => [{ rel: "stylesheet", href: contentStyle }]

const CellBody: FC<Post> = ({ bodyCopy }): JSX.Element => {
  return (
    <div className={cx(styles.status)}>
      <article className={cx(styles.statusArticle, "flex items-start")}>
        <Link to="/taka7beckham">
          <figure
            className={cx(
              styles.face,
              "flex-shrink-0 overflow-hidden rounded-full",
            )}
          >
            <img src={face} alt="face photo" width={46} height={46} />
          </figure>
        </Link>

        <div className="body w-full">
          <Markdown
            data-status-body
            options={{
              wrapper: "main",
              overrides: {
                CustomContainer: {
                  component: CustomContainer,
                },
                CustomCard: {
                  component: CustomCard,
                },
              },
            }}
          >
            {bodyCopy}
          </Markdown>
        </div>
      </article>
    </div>
  )
}

export default CellBody

const CustomContainer: FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <aside {...props}>
      <span className="msg-symbol">!</span>
      <div className="msg-content">
        <p>{children}</p>
      </div>
    </aside>
  )
}
